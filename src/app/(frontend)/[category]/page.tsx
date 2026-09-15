import type { Metadata } from 'next'

import { CollectionGrid } from '@/components/Category/CollectionGrid'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/primitives/Container'
import { PageHeader } from '@/components/primitives/PageHeader'
import { Reveal } from '@/components/primitives/Reveal'
import RichText from '@/components/RichText'
import { siteConfig } from '@/config/site'
import { getCategories, getCategoryBySlug } from '@/data/categories'
import { toSummary } from '@/data/collectionSummary'
import {
  breadcrumbJsonLd,
  buildMetadata,
  composeDescription,
  greekFor,
  mediaImage,
} from '@/utilities/seo'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ category: category.slug! }))
}

export default async function CategoryPage({ params }: Args) {
  const { category: slug } = await params
  const category = await getCategoryBySlug(decodeURIComponent(slug))

  if (!category) notFound()

  const summaries = category.collections.map((collection) => toSummary(collection, category.slug!))

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.name, path: '/' },
          { name: category.title, path: `/${category.slug}` },
        ])}
      />
      <PageHeader
        crumbs={[{ label: siteConfig.name, href: '/' }, { label: category.title }]}
        title={category.title}
        lead={category.shortDescription}
        aside={
          summaries.length
            ? `${String(summaries.length).padStart(2, '0')} ${
                summaries.length === 1 ? 'Collection' : 'Collections'
              }`
            : undefined
        }
      />

      {category.body && (
        <Container size="page">
          <Reveal className="mb-xl max-w-[62ch]">
            <RichText data={category.body} />
          </Reveal>
        </Container>
      )}

      <CollectionGrid collections={summaries} categoryTitle={category.title} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { category: slug } = await params
  const category = await getCategoryBySlug(decodeURIComponent(slug))

  if (!category) return {}

  const greek = greekFor(category.slug)

  return buildMetadata({
    title: `${category.title} · ${greek}`,
    description: composeDescription(
      category.shortDescription ||
        `${category.title} by ${siteConfig.name}, ${siteConfig.city}.`,
      greek,
    ),
    path: `/${category.slug}`,
    image: mediaImage(category.heroImage, category.title),
  })
}
