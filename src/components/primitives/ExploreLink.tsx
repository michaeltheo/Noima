import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

/** Understated text link with a rule that extends on hover. */
export const ExploreLink: React.FC<{
  href: string
  children?: React.ReactNode
  className?: string
}> = ({ href, children = 'Explore', className }) => (
  <Link
    href={href}
    className={cn(
      'group inline-flex items-center gap-2.5 self-start text-link uppercase text-espresso',
      className,
    )}
  >
    {children}
    <span
      aria-hidden
      className="h-px w-[26px] bg-espresso transition-[width] duration-400 ease-noima group-hover:w-[44px]"
    />
  </Link>
)
