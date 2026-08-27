import type { Crumb } from './Breadcrumb'

import React from 'react'

import { Breadcrumb } from './Breadcrumb'
import { Container } from './Container'
import { Reveal } from './Reveal'

/** Breadcrumb, title and optional lead — shared by category and collection pages. */
export const PageHeader: React.FC<{
  crumbs: Crumb[]
  title: string
  lead?: string | null
  children?: React.ReactNode
}> = ({ crumbs, title, lead, children }) => (
  <section className="pt-[calc(var(--spacing-header-sm)+var(--spacing-xl))] pb-lg md:pt-[calc(var(--spacing-header)+var(--spacing-2xl))] md:pb-xl">
    <Container>
      <Reveal>
        <Breadcrumb items={crumbs} />
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="max-w-[16ch] text-h1">{title}</h1>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-md max-w-[52ch] text-body-lg text-espresso-soft">{lead}</p>
        </Reveal>
      )}

      {children}
    </Container>
  </section>
)
