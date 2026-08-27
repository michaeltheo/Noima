'use client'

import type { Shot } from '@/config/studio'

import { Overlay, OverlayClose } from '@/components/primitives/Overlay'
import React, { useEffect } from 'react'

import { StudioImage } from './StudioImage'

const pad = (n: number) => String(n).padStart(2, '0')

const navButton =
  'absolute top-1/2 -translate-y-1/2 h-[54px] w-[54px] border-cream/40 text-cream text-2xl hover:bg-cream/15'

export const Lightbox: React.FC<{
  shots: Shot[]
  /** Index of the shot on show, or null when closed. */
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}> = ({ shots, index, onChange, onClose }) => {
  const open = index !== null
  const step = (delta: number) => onChange(((index ?? 0) + delta + shots.length) % shots.length)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onChange(((index ?? 0) - 1 + shots.length) % shots.length)
      if (event.key === 'ArrowRight') onChange(((index ?? 0) + 1) % shots.length)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, index, shots.length, onChange])

  const shot = index !== null ? shots[index] : undefined

  return (
    <Overlay
      open={open}
      onClose={onClose}
      label="Studio photographs"
      className="bg-[#241f1a]/95 p-[5vw]"
    >
      <OverlayClose
        onClick={onClose}
        className="absolute top-7 right-8 h-12 w-12 border-cream/40 text-cream hover:bg-cream/15"
      />

      <OverlayClose onClick={() => step(-1)} label="Previous" className={`${navButton} left-7`}>
        &#8249;
      </OverlayClose>

      {shot && (
        <div className="relative h-[86vh] w-[90vw]">
          <StudioImage
            src={shot.src}
            alt={shot.alt}
            sizes="90vw"
            className="rounded-[4px] object-contain"
          />
        </div>
      )}

      <OverlayClose onClick={() => step(1)} label="Next" className={`${navButton} right-7`}>
        &#8250;
      </OverlayClose>

      {shot && index !== null && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3.5 px-[5vw] text-center text-nav text-cream/70">
          <span className="tracking-[0.16em] text-cream/50">
            {pad(index + 1)} / {pad(shots.length)}
          </span>
          <span>{shot.alt}</span>
        </div>
      )}
    </Overlay>
  )
}
