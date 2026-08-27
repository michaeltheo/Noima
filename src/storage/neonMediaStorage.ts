import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import type { Payload } from 'payload'

/** Table holding the file bytes. Created on first use, outside Payload's schema. */
export const MEDIA_TABLE = 'media_files'

/** Public path the route handler in `app/(frontend)/media` answers on. */
export const MEDIA_URL_BASE = '/media'

/** Uploads are immutable — a new file gets a new name — so cache them hard. */
export const MEDIA_CACHE_CONTROL = 'public, max-age=31536000, immutable'

export type MediaRow = {
  data: Buffer
  filesize: number
  mime_type: string
}

/**
 * `CREATE TABLE` is idempotent but still a round trip, so it is memoised for
 * the life of the process rather than run ahead of every read and write.
 */
let ensured: Promise<void> | undefined

export const ensureMediaTable = (payload: Payload): Promise<void> => {
  ensured ??= payload.db.pool
    .query(
      `CREATE TABLE IF NOT EXISTS ${MEDIA_TABLE} (
         path       text PRIMARY KEY,
         mime_type  text NOT NULL,
         filesize   integer NOT NULL,
         data       bytea NOT NULL,
         updated_at timestamptz NOT NULL DEFAULT now()
       )`,
    )
    .then(() => undefined)
    .catch((err) => {
      // Let the next call retry rather than caching a rejected promise.
      ensured = undefined
      throw err
    })

  return ensured
}

/** Payload passes the prefix separately; the table keys on the joined path. */
export const mediaPath = (filename: string, prefix?: string): string =>
  prefix ? `${prefix}/${filename}` : filename

/**
 * The public URL for a stored path. Segments are encoded because uploads keep
 * their original names, and those contain spaces ("Recording 2026-08-27.mp4");
 * the route decodes them back into the key used here.
 */
export const mediaURL = (filename: string, prefix?: string): string =>
  `${MEDIA_URL_BASE}/${mediaPath(filename, prefix).split('/').map(encodeURIComponent).join('/')}`

export const readMediaFile = async (
  payload: Payload,
  path: string,
): Promise<MediaRow | undefined> => {
  await ensureMediaTable(payload)

  const { rows } = await payload.db.pool.query<MediaRow>(
    `SELECT data, mime_type, filesize FROM ${MEDIA_TABLE} WHERE path = $1`,
    [path],
  )

  return rows[0]
}

/**
 * Keeps upload bytes in Postgres itself, so a deploy carries no filesystem
 * state and Neon holds the whole site.
 *
 * The trade is real: every image is a query rather than a CDN hit, and the
 * bytes count against database storage. It suits this library — 36 files,
 * 1.7MB — and would not suit a growing one.
 *
 * Writes go through `payload.db.pool` directly rather than the request
 * transaction. A rolled-back upload therefore leaves its bytes behind; they
 * are unreferenced and overwritten if the same filename is uploaded again.
 */
export const neonMediaStorage: Adapter = (): GeneratedAdapter => ({
  name: 'neon-postgres',

  generateURL: ({ filename, prefix }) => mediaURL(filename, prefix),

  handleUpload: async ({ file, req }) => {
    await ensureMediaTable(req.payload)

    await req.payload.db.pool.query(
      `INSERT INTO ${MEDIA_TABLE} (path, mime_type, filesize, data)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (path) DO UPDATE SET
         mime_type  = EXCLUDED.mime_type,
         filesize   = EXCLUDED.filesize,
         data       = EXCLUDED.data,
         updated_at = now()`,
      [
        mediaPath(file.filename, req.data?.prefix as string),
        file.mimeType,
        // Not `file.filesize`: upstream reads that from `req.file.size`, which
        // is unset on some create paths. The buffer is what actually lands in
        // the column, so its length is the only value guaranteed to match.
        file.buffer.byteLength,
        file.buffer,
      ],
    )
  },

  handleDelete: async ({ doc, filename, req }) => {
    await ensureMediaTable(req.payload)

    await req.payload.db.pool.query(`DELETE FROM ${MEDIA_TABLE} WHERE path = $1`, [
      mediaPath(filename, doc?.prefix),
    ])
  },

  // Only reached if Payload access control is re-enabled for the collection.
  // The public route is the one in `app/(frontend)/media`.
  staticHandler: async (req, { params }) => {
    const row = await readMediaFile(req.payload, mediaPath(params.filename, params.prefix))

    if (!row) return new Response(null, { status: 404 })

    return new Response(new Uint8Array(row.data), {
      headers: {
        'Cache-Control': MEDIA_CACHE_CONTROL,
        'Content-Length': String(row.filesize),
        'Content-Type': row.mime_type,
      },
      status: 200,
    })
  },
})
