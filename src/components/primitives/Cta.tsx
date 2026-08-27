import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

export type CtaVariant = 'outline' | 'solid' | 'ghost'

const base =
  'inline-flex items-center gap-3 whitespace-nowrap rounded-[2px] border px-[34px] py-[18px] text-btn uppercase transition-colors duration-500 ease-noima'

const variants: Record<CtaVariant, string> = {
  outline: 'border-espresso text-espresso hover:bg-espresso hover:text-cream',
  solid: 'border-espresso bg-espresso text-cream hover:border-clay-deep hover:bg-clay-deep',
  ghost: 'border-line text-espresso hover:border-espresso hover:text-ink',
}

const arrowClass =
  'transition-transform duration-400 ease-noima group-hover:translate-x-[5px] motion-reduce:transform-none'

type SharedProps = {
  variant?: CtaVariant
  /** Trailing arrow that slides on hover. Off for secondary actions. */
  arrow?: boolean
  children: React.ReactNode
  className?: string
}

const Arrow = () => (
  <span aria-hidden className={arrowClass}>
    &#8594;
  </span>
)

/** Primary call-to-action, rendered as a button. */
export const Cta: React.FC<SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'outline',
  arrow = true,
  children,
  className,
  ...props
}) => (
  <button className={cn('group cursor-pointer', base, variants[variant], className)} {...props}>
    {children}
    {arrow && <Arrow />}
  </button>
)

/** Link-shaped twin of `Cta`. External hrefs open in a new tab. */
export const CtaLink: React.FC<SharedProps & { href: string; external?: boolean }> = ({
  variant = 'outline',
  arrow = true,
  href,
  external = false,
  children,
  className,
}) => {
  const classes = cn('group', base, variants[variant], className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow && <Arrow />}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}
