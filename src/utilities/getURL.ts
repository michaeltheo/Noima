import { seoConfig } from '@/config/seo'

/**
 * The site's origin, without a trailing slash.
 *
 * Canonicals, the sitemap and share links are all built from this, so a
 * production build must never answer with localhost: a stray
 * `NEXT_PUBLIC_SERVER_URL=http://localhost:3000` in the host's settings is
 * ignored there in favour of the real domain.
 */
export const getServerSideURL = (): string => {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL
  const isProduction = process.env.NODE_ENV === 'production'

  const origin =
    configured && !(isProduction && configured.includes('localhost'))
      ? configured
      : isProduction
        ? seoConfig.siteUrl
        : 'http://localhost:3000'

  return origin.replace(/\/+$/, '')
}
