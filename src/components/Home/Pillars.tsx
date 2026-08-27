import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import { SectionHeading } from '@/components/primitives/SectionHeading'
import { getCategories } from '@/data/categories'
import React from 'react'

import { PillarCard } from './PillarCard'

export const Pillars: React.FC = async () => {
  const categories = await getCategories()
  const pillars = categories.filter((category) => category.featuredOnHome)

  // Nothing to show until the client adds their first category.
  if (!pillars.length) return null

  return (
    <section id="pillars" className="py-2xl md:py-3xl">
      <Container>
        <Reveal>
          <SectionHeading index={`( 01 — ${String(pillars.length).padStart(2, '0')} )`}>
            Three worlds,
            <br />
            one sensibility.
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 gap-xl md:grid-cols-3 md:gap-lg">
          {pillars.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.08}>
              <PillarCard category={category} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
