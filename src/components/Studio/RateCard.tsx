import type { Rate } from '@/config/studio'

import { cn } from '@/utilities/ui'
import React from 'react'

export const RateCard: React.FC<{ rate: Rate }> = ({ rate }) => (
  <div
    className={cn(
      'rounded-md border border-line p-lg transition-[border-color,transform,box-shadow,background-color] duration-500 ease-noima',
      'hover:-translate-y-1 hover:border-clay hover:shadow-[0_26px_50px_-32px_rgba(58,51,44,0.5)] motion-reduce:hover:transform-none',
      rate.featured
        ? 'border-clay-deep/30 bg-cream-deep'
        : 'bg-cream-warm/50 hover:bg-cream-warm/80',
    )}
  >
    <div className="text-num tracking-[0.2em] text-espresso-soft uppercase">{rate.term}</div>

    <p className="mt-3.5 text-[2.6rem] leading-none font-light tracking-[-0.04em] text-ink">
      {rate.price}
      <small className="ml-1 text-nav font-normal tracking-normal text-espresso-soft">
        {rate.unit}
      </small>
    </p>

    <p className="mt-3 text-[0.90625rem] text-espresso-soft">{rate.description}</p>
  </div>
)
