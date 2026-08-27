import type { Category, Collection } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

/** A category with its collections attached, as the nav and listings need it. */
export type CategoryWithCollections = Category & {
  collections: Collection[]
}

/**
 * Every category, in admin drag order, each with its collections.
 *
 * Cached under the `categories` / `collections` tags, which the afterChange
 * hooks on both collections invalidate.
 */
export const getCategories = unstable_cache(
  async (): Promise<CategoryWithCollections[]> => {
    const payload = await getPayload({ config: configPromise })

    const [categories, collections] = await Promise.all([
      payload.find({
        collection: 'categories',
        limit: 100,
        pagination: false,
        sort: '_order',
        depth: 1,
      }),
      payload.find({
        collection: 'collections',
        limit: 500,
        pagination: false,
        sort: '_order',
        // depth 1 populates coverImage; `gallery` comes along so the category
        // grid can show photo and video counts without a second query.
        depth: 1,
      }),
    ])

    return categories.docs.map((category) => ({
      ...category,
      collections: collections.docs.filter((collection) => {
        const parent = collection.category
        const parentId = typeof parent === 'object' ? parent?.id : parent
        return parentId === category.id
      }),
    }))
  },
  ['categories-with-collections'],
  { tags: ['categories', 'collections'] },
)

export const getCategoryBySlug = async (
  slug: string,
): Promise<CategoryWithCollections | undefined> => {
  const categories = await getCategories()
  return categories.find((category) => category.slug === slug)
}

export const getCollectionBySlug = async (
  categorySlug: string,
  collectionSlug: string,
): Promise<{ category: CategoryWithCollections; collection: Collection } | undefined> => {
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return undefined

  const summary = category.collections.find((item) => item.slug === collectionSlug)
  if (!summary) return undefined

  // The list query runs at depth 0 for speed; the detail page needs the gallery
  // relationships populated.
  const payload = await getPayload({ config: configPromise })
  const full = await payload.findByID({
    collection: 'collections',
    id: summary.id,
    depth: 2,
  })

  return { category, collection: full }
}
