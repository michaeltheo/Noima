import type { Payload } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  MEDIA_CACHE_CONTROL,
  MEDIA_CHUNK_SIZE,
  readMediaBytes,
  readMediaMeta,
} from '@/storage/neonMediaStorage'

type Range = { end: number; start: number }

/**
 * Parses a single-byte-range header.
 *
 * Returns `null` when there is nothing to honour — no header, or a form we do
 * not serve, such as the multi-range `bytes=0-99,200-299` — in which case the
 * caller sends the whole file. `'unsatisfiable'` means the range points past
 * the end of the file and the answer is a 416.
 *
 * The end is clamped to `MEDIA_CHUNK_SIZE`. A player asking for `bytes=0-`
 * wants the entire film; answering with a short slice is allowed, and it is
 * what keeps a 100MB read out of this process.
 */
const parseRange = (header: null | string, size: number): 'unsatisfiable' | null | Range => {
  const match = header && /^bytes=(\d*)-(\d*)$/.exec(header.trim())

  if (!match) return null

  const [, rawStart, rawEnd] = match

  if (!rawStart && !rawEnd) return null

  // `bytes=-500` asks for the last 500 bytes.
  const suffix = !rawStart
  const start = suffix ? Math.max(0, size - Number(rawEnd)) : Number(rawStart)
  const end = suffix || !rawEnd ? size - 1 : Math.min(Number(rawEnd), size - 1)

  if (start >= size || start > end || (suffix && Number(rawEnd) === 0)) return 'unsatisfiable'

  return { end: Math.min(end, start + MEDIA_CHUNK_SIZE - 1), start }
}

/** Walks the file a chunk at a time, so no single read holds all of it. */
const mediaStream = (payload: Payload, path: string, size: number): ReadableStream<Uint8Array> => {
  let offset = 0

  return new ReadableStream({
    async pull(controller) {
      if (offset >= size) {
        controller.close()
        return
      }

      const data = await readMediaBytes(payload, path, offset, MEDIA_CHUNK_SIZE)

      if (!data?.byteLength) {
        controller.close()
        return
      }

      offset += data.byteLength
      controller.enqueue(new Uint8Array(data))
    },
  })
}

/**
 * Serves upload bytes straight out of Postgres at `/media/<filename>`.
 *
 * A catch-all rather than a single segment so prefixed paths keep working if
 * the Media collection ever gains one.
 *
 * Range requests are answered because `<video>` depends on them: without
 * `Accept-Ranges` and a 206, a browser has to pull the whole film down before
 * the first frame, and Safari will not play it at all.
 */
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<Response> => {
  const { path } = await params
  const payload = await getPayload({ config: configPromise })

  const key = path.map(decodeURIComponent).join('/')
  const meta = await readMediaMeta(payload, key)

  if (!meta) return new Response('Not found', { status: 404 })

  const range = parseRange(request.headers.get('range'), meta.filesize)

  if (range === 'unsatisfiable') {
    return new Response(null, {
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes */${meta.filesize}`,
      },
      status: 416,
    })
  }

  if (range) {
    const data = await readMediaBytes(payload, key, range.start, range.end - range.start + 1)

    if (!data) return new Response('Not found', { status: 404 })

    const last = range.start + data.byteLength - 1

    return new Response(new Uint8Array(data), {
      headers: {
        'Accept-Ranges': 'bytes',
        'Cache-Control': MEDIA_CACHE_CONTROL,
        'Content-Length': String(data.byteLength),
        'Content-Range': `bytes ${range.start}-${last}/${meta.filesize}`,
        'Content-Type': meta.mime_type,
      },
      status: 206,
    })
  }

  return new Response(mediaStream(payload, key, meta.filesize), {
    headers: {
      'Accept-Ranges': 'bytes',
      'Cache-Control': MEDIA_CACHE_CONTROL,
      'Content-Length': String(meta.filesize),
      'Content-Type': meta.mime_type,
    },
  })
}
