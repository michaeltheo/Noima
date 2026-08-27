/**
 * Creates or updates the Postgres schema from the Payload config.
 *
 * The Postgres adapter only pushes the schema when `NODE_ENV !== 'production'`
 * (see `@payloadcms/db-postgres` `connect.ts`), and `next build` always runs as
 * production. Building against a database that has never been touched by
 * `next dev` therefore fails on the first query with
 * `relation "posts" does not exist`. CI runs this script before the build so
 * the ephemeral Postgres service has tables.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

if (process.env.NODE_ENV === 'production') {
  throw new Error(
    'Schema push is disabled when NODE_ENV=production. Run this with NODE_ENV unset (or "development"/"test").',
  )
}

const payload = await getPayload({ config })

payload.logger.info('Database schema is in sync with the Payload config.')

await payload.destroy()
