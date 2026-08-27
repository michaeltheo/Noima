import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Category, Collection } from '@/payload-types'
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
]
