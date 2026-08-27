import type { Metadata } from 'next'

import { Gallery } from '@/components/Collection/Gallery'
import { GalleryFilter, type GalleryType } from '@/components/Collection/GalleryFilter'
import { Container } from '@/components/primitives/Container'
import { PageHeader } from '@/components/primitives/PageHeader'
import { Reveal } from '@/components/primitives/Reveal'
import RichText from '@/components/RichText'
import { siteConfig } from '@/config/site'
import { getCategories, getCollectionBySlug } from '@/data/categories'
import { galleryCounts } from '@/data/collectionSummary'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { notFound } from 'next/navigation'
import React from 'react'

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

/** A bare URL opens on photos, unless the collection only has video. */
const resolveType = (value: string | undefined, photos: number): GalleryType => {
  if (value === 'videos') return 'videos'
  if (value === 'photos') return 'photos'
  return photos > 0 ? 'photos' : 'videos'
}

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
  const basePath = `/${category.slug}/${collection.slug}`

  return (
    <main>
      <PageHeader
        crumbs={[
          { label: siteConfig.name, href: '/' },
          { label: category.title, href: `/${category.slug}` },
          { label: collection.title },
        ]}
        title={collection.title}
        lead={collection.shortDescription}
        aside={`${String(type === 'videos' ? counts.videos : counts.photos).padStart(2, '0')} ${
          type === 'videos' ? 'Videos' : 'Photos'
        }`}
      >
        <GalleryFilter
          basePath={basePath}
          active={type}
          photos={counts.photos}
          videos={counts.videos}
        />
      </PageHeader>

      {collection.body && (
        <Container size="page">
          <Reveal className="mb-xl max-w-[62ch]">
            <RichText data={collection.body} />
          </Reveal>
        </Container>
      )}

      <Gallery items={collection.gallery} type={type} />
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
    openGraph: {
      ...mergeOpenGraph({
        title,
        description,
        url: `/${category.slug}/${collection.slug}`,
      }),
    },
  }
}
