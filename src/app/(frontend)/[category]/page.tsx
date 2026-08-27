import type { Metadata } from 'next'

import { CollectionGrid } from '@/components/Category/CollectionGrid'
import { Container } from '@/components/primitives/Container'
import { PageHeader } from '@/components/primitives/PageHeader'
import { Reveal } from '@/components/primitives/Reveal'
import RichText from '@/components/RichText'
import { siteConfig } from '@/config/site'
import { getCategories, getCategoryBySlug } from '@/data/categories'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
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

  return (
    <main>
      <PageHeader
        crumbs={[{ label: siteConfig.name, href: '/' }, { label: category.title }]}
        title={category.title}
        lead={category.shortDescription}
      />

      {category.body && (
        <Container>
          <Reveal className="mb-xl max-w-[62ch]">
            <RichText data={category.body} />
          </Reveal>
        </Container>
      )}

      <CollectionGrid collections={category.collections} categorySlug={category.slug!} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { category: slug } = await params
  const category = await getCategoryBySlug(decodeURIComponent(slug))

  if (!category) return {}

  const title = category.meta?.title || category.title
  const description = category.meta?.description || category.shortDescription || undefined

  return {
    title,
    description,
    openGraph: mergeOpenGraph({ title, description, url: `/${category.slug}` }),
  }
}
