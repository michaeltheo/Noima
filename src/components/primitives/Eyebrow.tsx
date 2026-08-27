import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Small clay-coloured label above a heading.
 * `rule` prefixes the short horizontal line used in the hero.
 */
export const Eyebrow: React.FC<{
  children: React.ReactNode
  className?: string
  rule?: boolean
}> = ({ children, className, rule = false }) => (
  <p
    className={cn(
      'text-eyebrow text-clay-deep uppercase',
      rule && 'flex items-center gap-4 before:h-px before:w-[52px] before:bg-clay-deep/55',
      className,
    )}
  >
    {children}
  </p>
)
