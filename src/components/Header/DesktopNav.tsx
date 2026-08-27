import type { NavItem, NavLink } from '@/config/navigation'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { NavDropdown } from './NavDropdown'

/** An item is active when the current route is its page (hash links never match). */
const isActive = (href: string, pathname: string) =>
  !href.includes('#') && href !== '/' && pathname.startsWith(href)

export const DesktopNav: React.FC<{ items: NavItem[]; cta: NavLink; pathname: string }> = ({
  items,
  cta,
  pathname,
}) => (
  <nav className="hidden items-center gap-lg md:flex">
    {items.map((item) => (
      <div key={item.href} className="group relative flex h-header items-center">
        <Link
          href={item.href}
          aria-current={isActive(item.href, pathname) ? 'page' : undefined}
          className={cn(
            'relative py-1 text-nav transition-colors duration-300 ease-noima after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-[width] after:duration-400 after:ease-noima hover:text-espresso hover:after:w-full',
            isActive(item.href, pathname)
              ? 'text-espresso after:w-full after:bg-clay-deep'
              : 'text-espresso-soft after:bg-clay',
          )}
        >
          {item.label}
        </Link>
        {item.collections && <NavDropdown collections={item.collections} />}
      </div>
    ))}

    <Link
      href={cta.href}
      className="rounded-[2px] border border-line px-5 py-2.5 text-nav text-espresso transition-colors duration-300 ease-noima hover:border-espresso hover:bg-espresso hover:text-cream"
    >
      {cta.label}
    </Link>
  </nav>
)
