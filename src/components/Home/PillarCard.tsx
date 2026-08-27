import type { CategoryWithCollections } from '@/data/categories'

import { ExploreLink } from '@/components/primitives/ExploreLink'
import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

/** Home page card for one category. `index` is the 01/02/03 numeral. */
export const PillarCard: React.FC<{
  category: CategoryWithCollections
  index: number
}> = ({ category, index }) => {
  const href = `/${category.slug}`

  return (
    <article id={category.slug ?? undefined} className="group flex scroll-mt-header flex-col">
      <Link
        href={href}
        className="relative block h-[62vh] max-h-[480px] w-full overflow-hidden lg:h-[380px] xl:h-[480px]"
      >
        {category.heroImage && (
          <Media
            resource={category.heroImage}
            fill
            size="(max-width: 860px) 100vw, 33vw"
            imgClassName="object-cover transition-transform duration-1000 ease-noima group-hover:scale-[1.03]"
            videoClassName="h-full w-full object-cover"
          />
        )}

        {/* Scrim + label, revealed together on hover. */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(46,40,34,0.34),transparent_44%)] opacity-0 transition-opacity duration-600 ease-noima group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-5 left-[22px] z-20 flex translate-y-2.5 items-center gap-2.5 text-link text-cream uppercase opacity-0 transition-[opacity,transform] duration-500 ease-noima group-hover:translate-y-0 group-hover:opacity-100">
          View collection &#8594;
        </span>
      </Link>

      <div className="mt-md flex items-baseline gap-3.5">
        <span className="pt-2 text-num text-clay-deep">{String(index).padStart(2, '0')}</span>
        <h3 className="text-h3">
          <Link href={href}>{category.title}</Link>
        </h3>
      </div>

      {category.shortDescription && (
        <p className="mt-3.5 max-w-full text-body-sm text-espresso-soft md:max-w-[34ch]">
          {category.shortDescription}
        </p>
      )}

      <ExploreLink href={href} className="mt-md" />
    </article>
  )
}
