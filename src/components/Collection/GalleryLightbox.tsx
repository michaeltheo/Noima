'use client'

import type { GalleryItem } from './types'

import { Media } from '@/components/Media'
import { Overlay, OverlayClose } from '@/components/primitives/Overlay'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import React, { useEffect } from 'react'

const navButton =
  'absolute top-1/2 -translate-y-1/2 h-11 w-11 md:h-[54px] md:w-[54px] border-cream/40 text-cream text-2xl hover:bg-cream/15'

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
    <Overlay open={open} onClose={onClose} label="Gallery" className="bg-[#241f1a]/95 p-[5vw]">
      <OverlayClose
        onClick={onClose}
        className="absolute top-7 right-8 h-12 w-12 border-cream/40 text-cream hover:bg-cream/15"
      />

      <OverlayClose onClick={() => step(-1)} label="Previous" className={`${navButton} left-7`}>
        &#8249;
      </OverlayClose>

      {item?.kind === 'photo' && (
        <div className="relative h-[88vh] w-[90vw]">
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
          className="max-h-[88vh] max-w-[90vw] rounded-[4px] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
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

      <OverlayClose onClick={() => step(1)} label="Next" className={`${navButton} right-7`}>
        &#8250;
      </OverlayClose>

      {index !== null && (
        <span className="absolute bottom-7.5 left-1/2 -translate-x-1/2 text-nav tracking-widest text-cream/70">
          {index + 1} / {items.length}
        </span>
      )}
    </Overlay>
  )
}
