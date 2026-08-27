import type { Fact } from '@/config/studio'

import React from 'react'

/** Key numbers about the space, ruled off beneath the page lead. */
export const StudioFacts: React.FC<{ facts: Fact[] }> = ({ facts }) => (
  <dl className="mt-lg flex flex-wrap gap-lg border-t border-line pt-md">
    {facts.map((fact) => (
      <div key={fact.label}>
        <dt className="sr-only">{fact.label}</dt>
        <dd>
          <span className="block text-[1.6rem] leading-[1.1] font-light tracking-[-0.03em] text-ink">
            {fact.value}
          </span>
          <span className="mt-1 block text-num text-espresso-soft uppercase">{fact.label}</span>
        </dd>
      </div>
    ))}
  </dl>
)
