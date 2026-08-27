import type { NavLink } from '@/config/navigation'

import { useScrollLock } from '@/utilities/useScrollLock'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

/** Full-screen drawer for narrow viewports. Locks page scroll while open. */
export const MobileMenu: React.FC<{
  id: string
  items: NavLink[]
  open: boolean
  onNavigate: () => void
}> = ({ id, items, open, onNavigate }) => {
  useScrollLock(open)

  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-45 flex flex-col justify-center bg-cream px-8 transition-[transform,opacity,visibility] duration-600 ease-noima md:hidden',
        open
          ? 'visible translate-y-0 opacity-100'
          : 'pointer-events-none invisible -translate-y-full opacity-0',
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          tabIndex={open ? 0 : -1}
          className="border-b border-line py-3.5 font-display text-[11vw] leading-tight tracking-[-0.02em] text-espresso last:border-b-0"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
