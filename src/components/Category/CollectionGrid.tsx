import type { Collection } from '@/payload-types'

import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import React from 'react'

import { CollectionCard } from './CollectionCard'

export const CollectionGrid: React.FC<{
  collections: Collection[]
  categorySlug: string
}> = ({ collections, categorySlug }) => {
  if (!collections.length) {
    return (
      <Container>
        <p className="pb-2xl text-body-lg text-espresso-soft">
          Collections for this world are being prepared.
        </p>
      </Container>
    )
  }

  return (
    <section className="pb-2xl md:pb-3xl">
      <Container>
        <div className="grid grid-cols-1 gap-xl md:grid-cols-3 md:gap-lg">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={(i % 3) * 0.08}>
              <CollectionCard collection={collection} categorySlug={categorySlug} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
