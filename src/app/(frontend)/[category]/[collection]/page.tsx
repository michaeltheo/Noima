import type { Metadata } from 'next'

import type { CategoryWithCollections } from '@/data/categories'
import type { Collection } from '@/payload-types'

import { GalleryHeader } from '@/components/Collection/GalleryHeader'
import { GalleryMasonry } from '@/components/Collection/GalleryMasonry'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import RichText from '@/components/RichText'
import { siteConfig } from '@/config/site'
import { getCollectionBySlug } from '@/data/categories'
import { galleryCounts, galleryItems } from '@/data/collectionSummary'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  composeDescription,
  greekFor,
  imageGalleryJsonLd,
  mediaImage,
} from '@/utilities/seo'
import { notFound } from 'next/navigation'
import React from 'react'

type GalleryType = 'photos' | 'videos'

type Args = {
  params: Promise<{ category: string; collection: string }>
  searchParams: Promise<{ type?: string }>
}

/**
 * `?type=` is read per request, so this page cannot be static. Declared outright
 * rather than left to `generateStaticParams`: a build that finds no collections
 * never renders the page, never sees `searchParams`, and marks the route static —
 * then every album created afterwards 500s with DYNAMIC_SERVER_USAGE. The data
 * itself is still served from the tagged `unstable_cache`.
 */
export const dynamic = 'force-dynamic'

/** A bare URL opens on photos, unless the album only holds video. */
const resolveType = (value: string | undefined, photos: number): GalleryType => {
  if (value === 'videos') return 'videos'
  if (value === 'photos') return 'photos'
  return photos > 0 ? 'photos' : 'videos'
}

const countLabel = (n: number, type: GalleryType) =>
  type === 'videos'
    ? `${n} ${n === 1 ? 'film' : 'films'}`
    : `${n} ${n === 1 ? 'photograph' : 'photographs'}`

/** The admin's short description, or a sentence built from the titles. */
const englishDescription = (category: CategoryWithCollections, collection: Collection) =>
  collection.shortDescription ||
  `${collection.title} — a ${category.title} collection by ${siteConfig.name}, ${siteConfig.city}.`

const collectionPath = (category: CategoryWithCollections, collection: Collection) =>
  `/${category.slug}/${collection.slug}`

export default async function CollectionPage({ params, searchParams }: Args) {
  const { category: categorySlug, collection: collectionSlug } = await params
  const { type: typeParam } = await searchParams

  const result = await getCollectionBySlug(
    decodeURIComponent(categorySlug),
    decodeURIComponent(collectionSlug),
  )

  if (!result) notFound()

  const { category, collection } = result
  const counts = galleryCounts(collection)
  const type = resolveType(typeParam, counts.photos)
  const items = galleryItems(collection, type)
  const path = collectionPath(category, collection)

  // Photos only: search engines index the stills, whichever tab is open.
  const photoUrls = galleryItems(collection, 'photos').flatMap((item) =>
    item.media.url ? [absoluteUrl(getMediaUrl(item.media.url))] : [],
  )

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: siteConfig.name, path: '/' },
            { name: category.title, path: `/${category.slug}` },
            { name: collection.title, path },
          ]),
          imageGalleryJsonLd({
            name: collection.title,
            description: englishDescription(category, collection),
            path,
            images: photoUrls,
          }),
        ]}
      />
      <GalleryHeader
        crumbs={[
          { label: siteConfig.name, href: '/' },
          { label: category.title, href: `/${category.slug}` },
          { label: collection.title },
        ]}
        title={collection.title}
        subtitle={countLabel(items.length, type)}
        backHref={`/${category.slug}`}
      />

      {collection.body && (
        <Container>
          <Reveal className="max-w-[62ch]">
            <RichText data={collection.body} />
          </Reveal>
        </Container>
      )}

      <GalleryMasonry items={items} title={collection.title} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { category: categorySlug, collection: collectionSlug } = await params
  const result = await getCollectionBySlug(
    decodeURIComponent(categorySlug),
    decodeURIComponent(collectionSlug),
  )

  if (!result) return {}

  const { category, collection } = result
  const greek = greekFor(category.slug)
  const firstPhoto = galleryItems(collection, 'photos')[0]?.media

  return buildMetadata({
    title: `${collection.title} · ${greek}`,
    description: composeDescription(englishDescription(category, collection), greek),
    // Always the bare URL: `?type=photos` and `?type=videos` are one page.
    path: collectionPath(category, collection),
    image:
      mediaImage(collection.coverImage, collection.title) ??
      mediaImage(firstPhoto, collection.title),
  })
}
