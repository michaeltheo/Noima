import type { Crumb } from '@/components/primitives/Breadcrumb'

import { Breadcrumb } from '@/components/primitives/Breadcrumb'
import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import Link from 'next/link'
import React from 'react'

/** Album title with its count, and the way back to the category. */
export const GalleryHeader: React.FC<{
  crumbs: Crumb[]
  title: string
  subtitle: string
  backHref: string
}> = ({ crumbs, title, subtitle, backHref }) => (
  <section className="pt-[calc(var(--spacing-header-sm)+var(--spacing-xl))] pb-md md:pt-[calc(var(--spacing-header)+var(--spacing-2xl))] md:pb-lg">
    <Container>
      <Reveal>
        <Breadcrumb items={crumbs} />
      </Reveal>

      <div className="flex flex-wrap items-end justify-between gap-lg">
        <div>
          <Reveal delay={0.05}>
            <h1 className="text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.04] font-light tracking-[-0.035em]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-2.5 text-[0.9375rem] tracking-[0.04em] text-espresso-soft">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2.5 rounded-[2px] border border-line px-[22px] py-[13px] text-[0.8125rem] font-medium tracking-[0.08em] text-espresso uppercase transition-[background-color,color,border-color,gap] duration-400 ease-noima hover:gap-3.5 hover:border-espresso hover:bg-espresso hover:text-cream"
          >
            <span aria-hidden>&#8592;</span> Back to folders
          </Link>
        </Reveal>
      </div>
    </Container>
  </section>
)
