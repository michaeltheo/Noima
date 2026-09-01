'use client'

import type { GalleryItem } from './types'

import { Media } from '@/components/Media'
import { LightboxNav } from '@/components/primitives/LightboxNav'
import { LightboxPlate } from '@/components/primitives/LightboxPlate'
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
      // Below `lg` the extra padding reserves a strip for the close button at
      // the top and the nav bar at the bottom, so neither sits over the plate.
      className="bg-[#241f1a]/95 p-[5vw] pt-24 pb-32 lg:pt-[5vw] lg:pb-[5vw]"
    >
      <OverlayClose
        onClick={onClose}
        // Above the plate in the stack, and on its own blurred ground below
        // `lg`, where a bare cream hairline can vanish into a pale photograph.
        className="absolute top-5 right-5 z-10 h-12 w-12 border-cream/30 bg-ink/75 text-cream backdrop-blur-md hover:bg-cream/15 lg:top-7 lg:right-8 lg:border-cream/40 lg:bg-transparent lg:backdrop-blur-none"
      />

      {item?.kind === 'photo' && (
        <LightboxPlate
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onClose={onClose}
          className="h-[70vh] max-h-full w-[90vw] lg:h-[88vh]"
        >
          <Media
            resource={item.media}
            fill
            size="90vw"
            imgClassName="rounded-[4px] object-contain"
          />
        </LightboxPlate>
      )}

      {item?.kind === 'video' && (
        <video
          // Remounts per item so the browser reloads the new source.
          key={item.key}
          className="max-h-[70vh] max-w-[90vw] rounded-sm bg-black shadow-[0_30px_80px_rgba(0,0,0,0.4)] lg:max-h-[88vh]"
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
