/**
 * Moves the uploads already sitting in `public/media` into Postgres.
 *
 * Media rows in the database record filenames, not bytes, so the switch to
 * database-backed storage leaves the existing files stranded on disk. This
 * reads each one and writes it into `media_files` under the same name, which
 * is the key the `/media` route looks up.
 *
 * It then re-saves every media document. Rows written before the switch still
 * carry `/api/media/file/...` in their `url` columns; re-saving runs the
 * storage plugin's field hooks, which regenerate those as `/media/...`.
 *
 * Safe to re-run: every row is upserted. Run with `pnpm media:migrate`.
 */
import config from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'
import { readdir, readFile } from 'fs/promises'
import { getPayload } from 'payload'

import { MEDIA_TABLE, ensureMediaTable } from '../src/storage/neonMediaStorage.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaDir = path.resolve(dirname, '../public/media')

/** Payload only ever writes these out of the Media collection's imageSizes. */
const MIME_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
}

const payload = await getPayload({ config })

await ensureMediaTable(payload)

const filenames = (await readdir(mediaDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
  .map((entry) => entry.name)

let migrated = 0
const skipped: string[] = []

for (const filename of filenames) {
  const mimeType = MIME_TYPES[path.extname(filename).toLowerCase()]

  if (!mimeType) {
    skipped.push(filename)
    continue
  }

  const buffer = await readFile(path.join(mediaDir, filename))

  await payload.db.pool.query(
    `INSERT INTO ${MEDIA_TABLE} (path, mime_type, filesize, data)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (path) DO UPDATE SET
       mime_type  = EXCLUDED.mime_type,
       filesize   = EXCLUDED.filesize,
       data       = EXCLUDED.data,
       updated_at = now()`,
    [filename, mimeType, buffer.byteLength, buffer],
  )

  migrated += 1
}

// Re-save each document so the plugin's beforeChange hooks rewrite `url` and
// every `sizes.*.url` off the old /api/media/file path. Passing empty data
// leaves the fields themselves untouched, and with no incoming file the
// storage afterChange hook is a no-op.
const docs = await payload.find({ collection: 'media', limit: 0, pagination: false })

for (const doc of docs.docs) {
  await payload.update({ collection: 'media', id: doc.id, data: {}, depth: 0 })
}

payload.logger.info(`Refreshed URLs on ${docs.docs.length} media document(s).`)

const { rows } = await payload.db.pool.query<{ bytes: string; count: string }>(
  `SELECT count(*) AS count, coalesce(sum(filesize), 0) AS bytes FROM ${MEDIA_TABLE}`,
)

payload.logger.info(
  `Migrated ${migrated} file(s). ${MEDIA_TABLE} now holds ${rows[0]?.count} row(s), ${(
    Number(rows[0]?.bytes) /
    1024 /
    1024
  ).toFixed(2)}MB.`,
)

if (skipped.length) {
  payload.logger.warn(`Skipped ${skipped.length} file(s) of unknown type: ${skipped.join(', ')}`)
}

await payload.destroy()
