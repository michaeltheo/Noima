import { Container } from '@/components/primitives/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { included, rates, specs, terms } from '@/config/studio'
import React from 'react'

import { IncludedList } from './IncludedList'
import { RateCard } from './RateCard'
import { RentalActions } from './RentalActions'
import { SpecList } from './SpecList'
import { SubHeading } from './SubHeading'

export const Rental: React.FC = () => (
  <section id="rental" className="scroll-mt-header py-2xl">
    <Container size="page">
      <Reveal className="mb-xl">
        <Eyebrow>Rental</Eyebrow>
        <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06] font-light tracking-[-0.03em]">
          Book the space.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
        {rates.map((rate, i) => (
          <Reveal key={rate.term} delay={i * 0.08}>
            <RateCard rate={rate} />
          </Reveal>
        ))}
      </div>

      <div className="mt-2xl grid grid-cols-1 gap-xl lg:grid-cols-[1.1fr_1fr] lg:gap-2xl">
        <Reveal>
          <SubHeading>What&apos;s included</SubHeading>
          <IncludedList items={included} />
        </Reveal>

        <Reveal delay={0.08}>
          <SubHeading>The details</SubHeading>
          <SpecList specs={specs} />
          <RentalActions terms={terms} />
        </Reveal>
      </div>
    </Container>
  </section>
)
