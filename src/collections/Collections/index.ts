import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { galleryBlocks } from '@/blocks/Gallery/config'
import { seoTab } from '@/fields/seoTab'
import { revalidateCollection, revalidateCollectionDelete } from './hooks/revalidateCollection'

/**
 * A body of work inside a category — Aesthetic House, Atelier, The Cellar.
 *
 * Note the name clash: this is a NOIMA "collection" (a showcase), not a Payload
 * collection (a content type). It lives at `/[category]/[collection]`.
 */
export const Collections: CollectionConfig<'collections'> = {
  slug: 'collections',
  labels: { singular: 'Collection', plural: 'Collections' },
  orderable: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Which world this belongs to. Sets the first part of the URL.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              admin: {
                description: 'One or two sentences, shown on the card in the category listing.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              admin: { description: 'Optional longer text shown above the gallery.' },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'image' } },
              admin: { description: 'The card image in the category listing.' },
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'blocks',
              blocks: galleryBlocks,
              labels: { singular: 'Item', plural: 'Items' },
              admin: {
                initCollapsed: true,
                description: 'Images and videos, in the order they should appear.',
              },
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCollection],
    afterDelete: [revalidateCollectionDelete],
  },
}
