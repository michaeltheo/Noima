import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { Plugin } from 'payload'

import { neonMediaStorage } from '@/storage/neonMediaStorage'

export const plugins: Plugin[] = [
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
