'use client'

import type { CollectionSummary } from '@/data/collectionSummary'

import { Media } from '@/components/Media'
import React from 'react'

import { CameraIcon, PlayIcon } from './icons'
import { MediaChip } from './MediaChip'

/**
 * Clicking the card opens the photos/videos chooser rather than navigating
 * straight in, so the visitor picks which view they want first. The href is
 * still the photos view, so middle-click and crawlers behave sensibly.
 */
export const CollectionCard: React.FC<{
  collection: CollectionSummary
  onOpen: (collection: CollectionSummary) => void
}> = ({ collection, onOpen }) => (
  <a
    href={`${collection.href}?type=photos`}
    onClick={(event) => {
      // Let modified clicks open a new tab as usual.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      event.preventDefault()
      onOpen(collection)
    }}
    className="group flex cursor-pointer flex-col"
  >
    <div className="relative aspect-3/2 w-full overflow-hidden rounded-[4px] bg-cream-card">
      {collection.cover && (
        <Media
          resource={collection.cover}
          fill
          size="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imgClassName="object-cover transition-transform duration-1000 ease-noima group-hover:scale-105 motion-reduce:transform-none"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(58,51,44,0.34),transparent_46%)]" />
    </div>

    <div className="mt-[18px] flex items-baseline justify-between gap-3.5">
      <h3 className="text-[1.3rem] leading-tight tracking-[-0.024em]">{collection.title}</h3>
      <span className="inline-flex items-center gap-2 text-num whitespace-nowrap text-espresso-soft uppercase transition-[gap,color] duration-300 ease-noima group-hover:gap-3.5 group-hover:text-clay-deep">
        Open &#8594;
      </span>
    </div>

    {collection.description && (
      <p className="mt-[5px] text-nav text-espresso-soft">{collection.description}</p>
    )}

    <div className="mt-3 flex gap-4">
      <MediaChip
        icon={<CameraIcon className="h-full w-full" />}
        count={collection.photos}
        label="Photos"
      />
      <MediaChip
        icon={<PlayIcon className="h-full w-full" />}
        count={collection.videos}
        label="Videos"
      />
    </div>
  </a>
)
