'use client'

import type { GalleryItem } from './types'

import { Media } from '@/components/Media'
import { LightboxNav } from '@/components/primitives/LightboxNav'
import { Overlay, OverlayClose } from '@/components/primitives/Overlay'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import React, { useEffect } from 'react'

export const GalleryLightbox: React.FC<{
  items: GalleryItem[]
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}> = ({ items, index, onChange, onClose }) => {
  const open = index !== null
  const step = (delta: number) => onChange(((index ?? 0) + delta + items.length) % items.length)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onChange(((index ?? 0) - 1 + items.length) % items.length)
      if (event.key === 'ArrowRight') onChange(((index ?? 0) + 1) % items.length)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, index, items.length, onChange])

  const item = index !== null ? items[index] : undefined

  return (
    <Overlay
      open={open}
      onClose={onClose}
      label="Gallery"
      // Extra bottom padding below `lg` keeps the plate clear of the nav bar.
      className="bg-[#241f1a]/95 p-[5vw] pb-32 lg:pb-[5vw]"
    >
      <OverlayClose
        onClick={onClose}
        className="absolute top-7 right-8 h-12 w-12 border-cream/40 text-cream hover:bg-cream/15"
      />

      {item?.kind === 'photo' && (
        <div className="relative h-[70vh] w-[90vw] lg:h-[88vh]">
          <Media
            resource={item.media}
            fill
            size="90vw"
            imgClassName="rounded-[4px] object-contain"
          />
        </div>
      )}

      {item?.kind === 'video' && (
        <video
          // Remounts per item so the browser reloads the new source.
          key={item.key}
          className="max-h-[70vh] max-w-[90vw] rounded-[4px] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.4)] lg:max-h-[88vh]"
          poster={item.poster.url ? getMediaUrl(item.poster.url, item.poster.updatedAt) : undefined}
          controls
          autoPlay
          playsInline
        >
          <source
            src={getMediaUrl(item.media.url!, item.media.updatedAt)}
            type={item.media.mimeType ?? undefined}
          />
        </video>
      )}

      {index !== null && (
        <LightboxNav
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          counter={`${index + 1} / ${items.length}`}
        />
      )}
    </Overlay>
  )
}
