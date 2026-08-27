import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { mediaURL } from '@/storage/neonMediaStorage'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    // Files are uploaded from inside a Collection's gallery, so the library does
    // not need its own sidebar entry. Remove this to browse every upload.
    hidden: true,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // No staticDir: the cloud-storage plugin sets `disableLocalStorage` and
    // keeps the bytes in Postgres instead. See `@/storage/neonMediaStorage`.
    //
    // Payload builds `thumbnailURL` from the collection slug, which would send
    // the admin list back to /api/media/file. Resolving it by hand keeps the
    // admin panel on the same /media route as the frontend.
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes as Record<string, { filename?: string }> | undefined
      const filename = sizes?.thumbnail?.filename ?? doc.filename

      return typeof filename === 'string' ? mediaURL(filename) : null
    },
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
