import { seoPlugin } from '@payloadcms/plugin-seo'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Category, Collection } from '@/payload-types'
import { neonMediaStorage } from '@/storage/neonMediaStorage'
import { getServerSideURL } from '@/utilities/getURL'

type SeoDoc = Category | Collection

const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => {
  return doc?.title ? `${doc.title} | NOIMA` : 'NOIMA'
}

/** Collections nest under their category; categories sit at the root. */
const generateURL: GenerateURL<SeoDoc> = ({ doc }) => {
  const url = getServerSideURL()

  if (!doc?.slug) return url

  const category = (doc as Collection).category
  if (typeof category === 'object' && category?.slug) {
    return `${url}/${category.slug}/${doc.slug}`
  }

  return `${url}/${doc.slug}`
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  /**
   * Upload bytes live in Postgres, so Neon holds the entire site and a deploy
   * carries no filesystem state. See `@/storage/neonMediaStorage`.
   */
  cloudStoragePlugin({
    collections: {
      media: {
        adapter: neonMediaStorage,
        // Files are public, and routing them through Payload would put them
        // back on /api/media/file. The adapter's generateURL points at the
        // /media route handler instead.
        disablePayloadAccessControl: true,
      },
    },
  }),
]
