import { cn } from '@/utilities/ui'
import React from 'react'

type LogoProps = {
  /** `espresso` for the light header, `cream` for the dark footer. */
  variant?: 'espresso' | 'cream'
  className?: string
}

/**
 * NOIMA wordmark, set in the display face rather than loaded as an image so it
 * stays crisp at any size and needs no asset. Swap the <span> for an <Image>
 * here if a drawn logo is supplied — every caller picks it up.
 */
export const Logo: React.FC<LogoProps> = ({ variant = 'espresso', className }) => (
  <span
    className={cn(
      'font-display text-[1.5rem] leading-none font-medium tracking-[0.34em] uppercase select-none',
      variant === 'cream' ? 'text-cream' : 'text-espresso',
      className,
    )}
  >
    Noima
  </span>
)
