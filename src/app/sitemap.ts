import type { MetadataRoute } from 'next'

import { getCategories } from '@/data/categories'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { absoluteUrl } from '@/utilities/seo'

/**
 * Rebuilt hourly from the database, so a collection added in the admin is
 * listed within the hour without a deploy. Collection pages render on demand,
 * which a build-time sitemap generator never sees.
 */
export const revalidate = 3600

const coverUrl = (media: unknown): string[] =>
  media && typeof media === 'object' && 'url' in media && typeof media.url === 'string'
    ? [absoluteUrl(getMediaUrl(media.url))]
    : []

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories()

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/studio'), changeFrequency: 'monthly', priority: 0.9 },
  ]

  for (const category of categories) {
    pages.push({
      url: absoluteUrl(`/${category.slug}`),
      lastModified: category.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: coverUrl(category.heroImage),
    })

    for (const collection of category.collections) {
      pages.push({
        url: absoluteUrl(`/${category.slug}/${collection.slug}`),
        lastModified: collection.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
        images: coverUrl(collection.coverImage),
      })
    }
  }

  return pages
}
