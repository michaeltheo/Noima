import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { MEDIA_CACHE_CONTROL, readMediaFile } from '@/storage/neonMediaStorage'

/**
 * Serves upload bytes straight out of Postgres at `/media/<filename>`.
 *
 * A catch-all rather than a single segment so prefixed paths keep working if
 * the Media collection ever gains one.
 */
export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<Response> => {
  const { path } = await params
  const payload = await getPayload({ config: configPromise })

  const row = await readMediaFile(payload, path.map(decodeURIComponent).join('/'))

  if (!row) return new Response('Not found', { status: 404 })

  return new Response(new Uint8Array(row.data), {
    headers: {
      'Cache-Control': MEDIA_CACHE_CONTROL,
      'Content-Length': String(row.filesize),
      'Content-Type': row.mime_type,
    },
  })
}
