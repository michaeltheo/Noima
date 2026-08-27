import type { Crumb } from './Breadcrumb'

import React from 'react'

import { Breadcrumb } from './Breadcrumb'
import { Container } from './Container'
import { Reveal } from './Reveal'

/**
 * Breadcrumb, title and lead — shared by the category, collection and studio
 * pages. `aside` sits opposite the lead paragraph (e.g. "06 Collections").
 */
export const PageHeader: React.FC<{
  crumbs: Crumb[]
  title: string
  lead?: string | null
  aside?: React.ReactNode
  size?: 'site' | 'page'
  children?: React.ReactNode
}> = ({ crumbs, title, lead, aside, size = 'page', children }) => (
  <section className="pt-[calc(var(--spacing-header-sm)+var(--spacing-xl))] pb-lg md:pt-[calc(var(--spacing-header)+var(--spacing-2xl))] md:pb-xl">
    <Container size={size}>
      <Reveal>
        <Breadcrumb items={crumbs} />
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.04] font-light tracking-[-0.035em]">
          {title}
        </h1>
      </Reveal>

      {(lead || aside) && (
        <div className="mt-md flex flex-wrap items-end justify-between gap-lg">
          {lead && (
            <Reveal delay={0.12}>
              <p className="max-w-[48ch] text-body-lg text-espresso-soft">{lead}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={0.18}>
              <span className="text-link tracking-[0.2em] whitespace-nowrap text-espresso-soft uppercase">
                {aside}
              </span>
            </Reveal>
          )}
        </div>
      )}

      {children}
    </Container>
  </section>
)
