import { Container } from '@/components/primitives/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { siteConfig } from '@/config/site'
import React from 'react'

import { HeroBackdrop } from './HeroBackdrop'

export const Hero: React.FC = () => (
  <section className="relative overflow-hidden pt-[calc(var(--spacing-header-sm)+var(--spacing-2xl))] pb-2xl md:pt-[calc(var(--spacing-header)+var(--spacing-3xl))] md:pb-3xl">
    <HeroBackdrop />

    <Container className="relative z-10">
      <Reveal>
        <Eyebrow rule className="mb-lg">
          {siteConfig.tagline}
        </Eyebrow>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="max-w-[16ch] text-hero">
          A quiet sense of <em className="not-italic font-normal text-clay-deep">meaning</em>, in
          everything.
        </h1>
      </Reveal>

      <Reveal delay={0.16} className="mt-xl">
        <p className="max-w-[42ch] text-body-lg text-espresso-soft">{siteConfig.description}</p>
      </Reveal>
    </Container>
  </section>
)
