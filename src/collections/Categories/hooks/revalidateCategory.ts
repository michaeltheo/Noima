import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Category } from '../../../payload-types'

/** Categories drive the header nav and the home page, so both are flushed too. */
const revalidateCategoryPaths = (slug?: string | null) => {
  if (slug) revalidatePath(`/${slug}`)
  revalidatePath('/')
  revalidateTag('categories', 'max')
}

export const revalidateCategory: CollectionAfterChangeHook<Category> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating category: /${doc.slug}`)
    revalidateCategoryPaths(doc.slug)

    // A rename leaves the old path cached, so clear that too.
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateCategoryPaths(previousDoc.slug)
    }
  }

  return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook<Category> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) revalidateCategoryPaths(doc?.slug)
  return doc
}
