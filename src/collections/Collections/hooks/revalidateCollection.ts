import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Collection } from '../../../payload-types'

/** Resolves the parent category slug whether the relationship is populated or not. */
const categorySlug = (category: Collection['category']): string | undefined =>
  typeof category === 'object' && category !== null ? (category.slug ?? undefined) : undefined

const revalidateCollectionPaths = (collection: Partial<Collection>) => {
  const parent = categorySlug(collection.category as Collection['category'])

  if (parent && collection.slug) revalidatePath(`/${parent}/${collection.slug}`)
  if (parent) revalidatePath(`/${parent}`)
  revalidateTag('collections', 'max')
}

export const revalidateCollection: CollectionAfterChangeHook<Collection> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating collection: ${doc.slug}`)
    revalidateCollectionPaths(doc)

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateCollectionPaths(previousDoc)
    }
  }

  return doc
}

export const revalidateCollectionDelete: CollectionAfterDeleteHook<Collection> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) revalidateCollectionPaths(doc)
  return doc
}
