import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { legacyGalleryField } from '@/blocks/Gallery/config'
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
    // Groups the sidebar entry under a heading, so the nav no longer reads
    // "Collections › Collections" — see `Categories` and `Users`.
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
    description: 'An album of work — photos and films — shown inside a category.',
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
          /**
           * Two flat fields rather than a block builder.
           *
           * The site renders one continuous masonry and puts photos and films on
           * separate tabs, so per-group layout never reached the page. Editors
           * get a single drop zone instead of picking a block type per group.
           */
          fields: [
            {
              name: 'photos',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              filterOptions: { mimeType: { contains: 'image' } },
              label: 'Photos',
              admin: {
                description:
                  'Drop in as many photos as you like — they upload together. Drag to reorder.',
              },
            },
            {
              name: 'videos',
              type: 'array',
              labels: { singular: 'Film', plural: 'Films' },
              admin: {
                description:
                  'Only if this album has film. Each one needs a still to show before it plays.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'video',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                      filterOptions: { mimeType: { contains: 'video' } },
                      admin: { width: '50%', description: 'MP4 (H.264) plays everywhere.' },
                    },
                    {
                      name: 'poster',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                      filterOptions: { mimeType: { contains: 'image' } },
                      label: 'Still',
                      admin: {
                        width: '50%',
                        description:
                          'Shown before playback. Uploads are not transcoded, so no frame can be pulled automatically.',
                      },
                    },
                  ],
                },
              ],
            },
            legacyGalleryField,
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
