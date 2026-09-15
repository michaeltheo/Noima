import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Collections } from './collections/Collections'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    meta: {
      titleSuffix: ' · NOIMA',
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Every Vercel function instance opens its own pool, and a gallery fans
      // out into dozens of concurrent image requests. At pg's default of 10 per
      // instance that burst crashed the 256MB Render database, so each instance
      // is held to a few connections and lets idle ones go.
      max: 3,
      idleTimeoutMillis: 10_000,
    },
    // `media_files` holds the upload bytes and is created by the storage
    // adapter, not by this config. Drizzle's dev push reconciles the whole
    // schema, so without this it offers to drop the table — and the images
    // with it — on every boot. See `@/storage/neonMediaStorage`.
    tablesFilter: ['!media_files'],
  }),
  collections: [Categories, Collections, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
