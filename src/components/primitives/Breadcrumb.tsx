import Link from 'next/link'
import React from 'react'

export type Crumb = { label: string; href?: string }

/** Trail above a page title. The final crumb is the current page. */
export const Breadcrumb: React.FC<{ items: Crumb[] }> = ({ items }) => (
  <nav
    aria-label="Breadcrumb"
    className="mb-md flex items-center gap-3 text-nav text-espresso-soft"
  >
    {items.map((item, i) => (
      <React.Fragment key={item.label}>
        {i > 0 && (
          <span aria-hidden className="opacity-50">
            /
          </span>
        )}
        {item.href ? (
          <Link
            href={item.href}
            className="transition-colors duration-300 ease-noima hover:text-clay-deep"
          >
            {item.label}
          </Link>
        ) : (
          <span aria-current="page" className="text-espresso">
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
)
