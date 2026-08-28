import { Logo } from '@/components/Logo'
import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * What NOIMA shows while something is still on its way: the wordmark breathing
 * over the Eyebrow hairline, drawing itself in and out.
 *
 * One indicator for both waits — `espresso` for a route arriving over cream,
 * `cream` for a lightbox plate over espresso — so a loading moment always looks
 * like the same brand rather than a different spinner each time.
 */
export const BrandLoader: React.FC<{
  variant?: 'espresso' | 'cream'
  /** Announced to screen readers; the visual is wordless. */
  label?: string
  className?: string
}> = ({ variant = 'espresso', label = 'Loading', className }) => (
  <div role="status" className={cn('flex flex-col items-center gap-md', className)}>
    <Logo variant={variant} className="is-breathing h-8.5" />

    <span
      aria-hidden
      className={cn(
        'is-tracing block h-px w-13',
        variant === 'cream' ? 'bg-cream/45' : 'bg-clay-deep/55',
      )}
    />

    <span className="sr-only">{label}</span>
  </div>
)
