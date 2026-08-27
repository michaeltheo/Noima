import { Breadcrumb } from '@/components/primitives/Breadcrumb'
import { Container } from '@/components/primitives/Container'
import { CtaLink } from '@/components/primitives/Cta'
import { Reveal } from '@/components/primitives/Reveal'
import { facts, studio } from '@/config/studio'
import { siteConfig } from '@/config/site'
import React from 'react'

import { StudioFacts } from './StudioFacts'

export const StudioHead: React.FC = () => (
  <section className="pt-[calc(var(--spacing-header-sm)+var(--spacing-xl))] pb-lg md:pt-[calc(var(--spacing-header)+var(--spacing-2xl))] md:pb-xl">
    <Container size="page">
      <Reveal>
        <Breadcrumb items={[{ label: siteConfig.name, href: '/' }, { label: studio.title }]} />
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.04] font-light tracking-[-0.035em]">
          {studio.title}
        </h1>
      </Reveal>

      <div className="mt-md flex flex-wrap items-end justify-between gap-lg">
        <Reveal delay={0.12}>
          <p className="max-w-[52ch] text-body-lg text-espresso-soft">{studio.lead}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <CtaLink href="#rental">Rental &amp; rates</CtaLink>
        </Reveal>
      </div>

      <Reveal delay={0.24}>
        <StudioFacts facts={facts} />
      </Reveal>
    </Container>
  </section>
)
