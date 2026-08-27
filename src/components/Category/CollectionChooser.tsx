'use client'

import type { CollectionSummary } from '@/data/collectionSummary'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Overlay, OverlayClose } from '@/components/primitives/Overlay'
import { useRouter } from 'next/navigation'
import React from 'react'

import { CameraIcon, PlayIcon } from './icons'

const option =
  'flex cursor-pointer flex-col items-center gap-2 rounded-md border border-line-soft bg-cream-card px-md py-lg text-espresso transition-[border-color,background-color,transform,box-shadow] duration-400 ease-noima hover:-translate-y-1 hover:border-clay hover:bg-[#FBF8F2] hover:shadow-[0_18px_36px_-24px_rgba(58,51,44,0.5)] motion-reduce:hover:transform-none disabled:pointer-events-none disabled:opacity-40'

/** Asks the visitor whether they want the photos or the videos of a collection. */
export const CollectionChooser: React.FC<{
  categoryTitle: string
  collection: CollectionSummary | null
  onClose: () => void
}> = ({ categoryTitle, collection, onClose }) => {
  const router = useRouter()
  const open = collection !== null

  const go = (type: 'photos' | 'videos') => {
    if (collection) router.push(`${collection.href}?type=${type}`)
  }

  return (
    <Overlay
      open={open}
      onClose={onClose}
      label={`${collection?.title ?? 'Collection'} — choose photos or videos`}
      className="bg-[#241f1a]/50 p-6 backdrop-blur-[5px]"
    >
      <div
        className={`relative w-full max-w-[560px] rounded-lg border border-line bg-cream p-[clamp(34px,5vw,58px)] text-center shadow-[0_40px_90px_-28px_rgba(36,31,26,0.55)] transition-transform duration-500 ease-noima ${
          open ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'
        }`}
      >
        <OverlayClose
          onClick={onClose}
          className="absolute top-4 right-5 h-10 w-10 border-line text-espresso hover:bg-cream-deep"
        />

        <Eyebrow>{categoryTitle}</Eyebrow>
        <h2 className="mt-3 text-[clamp(1.9rem,4.4vw,2.6rem)] leading-[1.06] font-light tracking-[-0.03em]">
          {collection?.title}
        </h2>
        {collection?.description && (
          <p className="mt-2 text-body-sm text-espresso-soft">{collection.description}</p>
        )}

        <div className="mt-lg grid grid-cols-1 gap-md min-[460px]:grid-cols-2">
          <button
            type="button"
            className={option}
            onClick={() => go('photos')}
            disabled={!collection?.photos}
          >
            <CameraIcon className="size-[34px] text-clay-deep" />
            <span className="font-display text-[2.1rem] leading-none font-light tracking-[-0.03em]">
              {collection?.photos ?? 0}
            </span>
            <span className="text-eyebrow tracking-[0.16em] text-espresso-soft uppercase">
              Photos
            </span>
          </button>

          <button
            type="button"
            className={option}
            onClick={() => go('videos')}
            disabled={!collection?.videos}
          >
            <PlayIcon className="size-[34px] text-clay-deep" />
            <span className="font-display text-[2.1rem] leading-none font-light tracking-[-0.03em]">
              {collection?.videos ?? 0}
            </span>
            <span className="text-eyebrow tracking-[0.16em] text-espresso-soft uppercase">
              Videos
            </span>
          </button>
        </div>
      </div>
    </Overlay>
  )
}
