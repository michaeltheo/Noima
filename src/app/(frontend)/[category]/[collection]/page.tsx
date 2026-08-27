import type { Metadata } from 'next'

import { GalleryHeader } from '@/components/Collection/GalleryHeader'
import { GalleryMasonry } from '@/components/Collection/GalleryMasonry'
import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import RichText from '@/components/RichText'
import { siteConfig } from '@/config/site'
import { getCategories, getCollectionBySlug } from '@/data/categories'
import { galleryCounts, galleryItems } from '@/data/collectionSummary'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { notFound } from 'next/navigation'
import React from 'react'

type GalleryType = 'photos' | 'videos'

type Args = {
  params: Promise<{ category: string; collection: string }>
  searchParams: Promise<{ type?: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.flatMap((category) =>
    category.collections.map((collection) => ({
      category: category.slug!,
      collection: collection.slug!,
    })),
  )
}

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

  return (
    <main>
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

      <GalleryMasonry items={items} />
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
  const title = collection.meta?.title || collection.title
  const description = collection.meta?.description || collection.shortDescription || undefined

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url: `/${category.slug}/${collection.slug}`,
    }),
  }
}
