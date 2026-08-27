'use client'

import type { CollectionSummary } from '@/data/collectionSummary'

import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import React, { useState } from 'react'

import { CollectionCard } from './CollectionCard'
import { CollectionChooser } from './CollectionChooser'

export const CollectionGrid: React.FC<{
  collections: CollectionSummary[]
  categoryTitle: string
}> = ({ collections, categoryTitle }) => {
  const [chosen, setChosen] = useState<CollectionSummary | null>(null)

  if (!collections.length) {
    return (
      <Container size="page">
        <p className="pb-3xl text-body-lg text-espresso-soft">
          Collections for this world are being prepared.
        </p>
      </Container>
    )
  }

  return (
    <section className="pb-2xl md:pb-3xl">
      <Container size="page">
        <div className="grid grid-cols-1 gap-lg min-[560px]:grid-cols-2 min-[560px]:gap-x-lg min-[560px]:gap-y-xl lg:grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={(i % 3) * 0.07}>
              <CollectionCard collection={collection} onOpen={setChosen} />
            </Reveal>
          ))}
        </div>
      </Container>

      <CollectionChooser
        categoryTitle={categoryTitle}
        collection={chosen}
        onClose={() => setChosen(null)}
      />
    </section>
  )
}
