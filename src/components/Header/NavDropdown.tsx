import type { NavLink } from '@/config/navigation'

import Link from 'next/link'
import React from 'react'

/** Hover panel listing a section's collections. */
export const NavDropdown: React.FC<{ collections: NavLink[] }> = ({ collections }) => (
  <div className="pointer-events-none invisible absolute top-full left-1/2 min-w-[252px] -translate-x-1/2 translate-y-1.5 pt-2.5 opacity-0 transition-[opacity,visibility,transform] duration-400 ease-noima group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
    <div className="rounded-md border border-line bg-cream-warm/95 px-[22px] py-5 shadow-[0_34px_64px_-32px_rgba(58,51,44,0.55)] backdrop-blur-lg">
      <h5 className="text-overline text-clay-deep mb-3 uppercase">Collections</h5>
      {collections.map((collection) => (
        <Link
          key={collection.href}
          href={collection.href}
          className="block border-b border-line-soft py-2 text-nav text-espresso-soft transition-[color,padding] duration-300 ease-noima last:border-b-0 hover:pl-1.5 hover:text-clay-deep"
        >
          {collection.label}
        </Link>
      ))}
    </div>
  </div>
)
