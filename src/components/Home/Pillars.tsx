import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import { SectionHeading } from '@/components/primitives/SectionHeading'
import { pillars } from '@/config/pillars'
import React from 'react'

import { PillarCard } from './PillarCard'

export const Pillars: React.FC = () => (
  <section id="pillars" className="py-2xl md:py-3xl">
    <Container>
      <Reveal>
        <SectionHeading index={`( 01 — 0${pillars.length} )`}>
          Three worlds,
          <br />
          one sensibility.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-xl md:grid-cols-3 md:gap-lg">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.id} delay={i * 0.08}>
            <PillarCard pillar={pillar} />
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
)
