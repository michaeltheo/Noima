import type { Collection } from '@/payload-types'

import { ExploreLink } from '@/components/primitives/ExploreLink'
import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

export const CollectionCard: React.FC<{ collection: Collection; categorySlug: string }> = ({
  collection,
  categorySlug,
}) => {
  const href = `/${categorySlug}/${collection.slug}`

  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-4/5 w-full overflow-hidden rounded-[4px]">
        {collection.coverImage && (
          <Media
            resource={collection.coverImage}
            fill
            size="(max-width: 768px) 100vw, 33vw"
            imgClassName="object-cover transition-transform duration-1000 ease-noima group-hover:scale-[1.03]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 ease-noima group-hover:bg-espresso/10" />
      </Link>

      <h3 className="mt-md text-h3">
        <Link href={href}>{collection.title}</Link>
      </h3>

      {collection.shortDescription && (
        <p className="mt-3 max-w-full text-body-sm text-espresso-soft md:max-w-[34ch]">
          {collection.shortDescription}
        </p>
      )}

      <ExploreLink href={href} className="mt-md">
        View
      </ExploreLink>
    </article>
  )
}
