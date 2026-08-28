/**
 * Copies retired gallery blocks onto the flat `photos` and `videos` fields.
 *
 * Galleries used to be a block builder: one block held many images, another
 * held a video and its poster. The site flattened all of it anyway, so the
 * builder was replaced by two plain fields. This moves the existing rows.
 *
 * Safe to run more than once — a collection that already has `photos` or
 * `videos` is skipped, so it will not duplicate anything. Run it after
 * `pnpm db:push` has added the new columns and before `legacyGalleryField` is
 * removed from `@/blocks/Gallery/config`, since that field is what makes the
 * old rows readable.
 *
 *   pnpm payload run ./scripts/migrate-gallery.ts
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const idOf = (value: unknown): number | null => {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) return (value as { id: number }).id
  return null
}

const payload = await getPayload({ config })

const { docs } = await payload.find({
  collection: 'collections',
  limit: 0,
  pagination: false,
  depth: 0,
})

let migrated = 0
let skipped = 0

for (const doc of docs) {
  const blocks = doc.gallery ?? []

  if (!blocks.length) continue

  if (doc.photos?.length || doc.videos?.length) {
    payload.logger.warn(`Skipping "${doc.title}" — it already has photos or films.`)
    skipped += 1
    continue
  }

  const photos: number[] = []
  const videos: { video: number; poster: number }[] = []

  for (const block of blocks) {
    if (block.blockType === 'galleryImage') {
      for (const image of block.images ?? []) {
        const id = idOf(image)
        if (id !== null) photos.push(id)
      }
    } else {
      const video = idOf(block.video)
      const poster = idOf(block.poster)
      if (video !== null && poster !== null) videos.push({ video, poster })
    }
  }

  await payload.update({
    collection: 'collections',
    id: doc.id,
    // The old blocks stay until the legacy field is deleted, so a bad run can
    // be undone by clearing `photos`/`videos` and running this again.
    data: { photos, videos },
    depth: 0,
  })

  payload.logger.info(`"${doc.title}" — ${photos.length} photos, ${videos.length} films.`)
  migrated += 1
}

payload.logger.info(`Migrated ${migrated} collection(s), skipped ${skipped}.`)

await payload.destroy()
