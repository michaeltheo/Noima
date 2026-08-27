import type { Metadata } from 'next'

import { Gallery } from '@/components/Collection/Gallery'
import { Container } from '@/components/primitives/Container'
import { PageHeader } from '@/components/primitives/PageHeader'
import { Reveal } from '@/components/primitives/Reveal'
import RichText from '@/components/RichText'
import { siteConfig } from '@/config/site'
import { getCategories, getCollectionBySlug } from '@/data/categories'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ category: string; collection: string }> }

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.flatMap((category) =>
    category.collections.map((collection) => ({
      category: category.slug!,
      collection: collection.slug!,
    })),
  )
}

export default async function CollectionPage({ params }: Args) {
  const { category: categorySlug, collection: collectionSlug } = await params
  const result = await getCollectionBySlug(
    decodeURIComponent(categorySlug),
    decodeURIComponent(collectionSlug),
  )

  if (!result) notFound()

  const { category, collection } = result

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
      />

      {collection.body && (
        <Container>
          <Reveal className="mb-xl max-w-[62ch]">
            <RichText data={collection.body} />
          </Reveal>
        </Container>
      )}

      <Gallery items={collection.gallery} />
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
