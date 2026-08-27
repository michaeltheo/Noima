import { cn } from '@/utilities/ui'
import React from 'react'

/** Section title on the left, optional counter (e.g. "( 01 — 03 )") on the right. */
export const SectionHeading: React.FC<{
  children: React.ReactNode
  index?: string
  className?: string
}> = ({ children, index, className }) => (
  <div className={cn('flex flex-wrap items-baseline justify-between gap-lg mb-xl', className)}>
    <h2 className="text-h2">{children}</h2>
    {index && <span className="text-index text-espresso-soft uppercase">{index}</span>}
  </div>
)
