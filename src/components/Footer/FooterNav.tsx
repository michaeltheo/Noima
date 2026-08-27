import type { NavLink } from '@/config/navigation'

import Link from 'next/link'
import React from 'react'

export const FooterNav: React.FC<{ items: NavLink[]; instagram: string }> = ({
  items,
  instagram,
}) => (
  <nav className="flex flex-wrap gap-md text-nav">
    {items.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="text-cream/70 transition-colors duration-300 ease-noima hover:text-clay"
      >
        {item.label}
      </Link>
    ))}
    <a
      href={instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cream/70 transition-colors duration-300 ease-noima hover:text-clay"
    >
      Instagram
    </a>
  </nav>
)
