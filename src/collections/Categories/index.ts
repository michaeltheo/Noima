import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { seoTab } from '@/fields/seoTab'
import { revalidateCategory, revalidateCategoryDelete } from './hooks/revalidateCategory'

/**
 * A top-level world of the site — Luxury Real Estate, Food, Fashion.
 *
 * Categories drive the header navigation, the home page pillars and the
 * `/[category]` route. Editors add and reorder them; nothing about them is
 * hardcoded in the frontend.
 */
export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  // Enables drag-to-reorder in the admin list view — no manual order field.
  orderable: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // Keeps nav and pillar queries cheap when a category is referenced elsewhere.
  defaultPopulate: {
    title: true,
    slug: true,
    shortDescription: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featuredOnHome', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Shown in the navigation and as the page heading.' },
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
                description:
                  'One or two sentences. Used on the home page pillar card and as the fallback meta description.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              admin: { description: 'Optional longer introduction shown on the category page.' },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Used on the pillar card and at the top of the category page.',
              },
            },
          ],
        },
        {
          label: 'Placement',
          fields: [
            {
              name: 'featuredOnHome',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show as a pillar on the home page',
            },
            {
              name: 'showInNav',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show in the main navigation',
            },
          ],
        },
        seoTab,
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCategory],
    afterDelete: [revalidateCategoryDelete],
  },
}
