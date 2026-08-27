/**
 * Turns a Payload media URL into one Next can optimise.
 *
 * Payload stores `url` as `/api/media/file/<name>`, a dynamic route it serves
 * itself. The same files are also written to `public/media` (Media.staticDir),
 * so we rewrite to `/media/<name>`: Next serves that as a static asset and its
 * image optimiser can read it directly, which is both faster and — unlike the
 * API route — reliably optimised.
 *
 * `cacheTag` is deliberately NOT applied to images. A query string cannot be
 * matched by `images.localPatterns` (its `search` accepts only a literal), so
 * Next refuses to optimise such URLs. Pass it only for media that bypasses the
 * optimiser, such as a <video> source.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const staticUrl = url.startsWith('/api/media/file/')
    ? `/media/${url.slice('/api/media/file/'.length)}`
    : url

  return cacheTag ? `${staticUrl}?${encodeURIComponent(cacheTag)}` : staticUrl
}
