import { Container } from '@/components/primitives/Container'
import { CtaLink } from '@/components/primitives/Cta'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { siteConfig } from '@/config/site'
import { studio } from '@/config/studio'
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

      {/* Announces the studio rental and routes straight to it. */}
      <Reveal delay={0.24} className="mt-lg flex flex-wrap items-center gap-x-md gap-y-sm">
        <CtaLink href="/studio" variant="solid">
          Book the studio
        </CtaLink>
        <p className="text-label uppercase text-espresso-soft">
          {studio.title} · Now open in {siteConfig.city}
        </p>
      </Reveal>
    </Container>
  </section>
)
