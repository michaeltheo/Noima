'use client'

import type { Shot } from '@/config/studio'

import { LightboxNav } from '@/components/primitives/LightboxNav'
import { Overlay, OverlayClose } from '@/components/primitives/Overlay'
import React, { useEffect } from 'react'

import { StudioImage } from './StudioImage'

const pad = (n: number) => String(n).padStart(2, '0')

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
      // Extra bottom padding below `lg` keeps the plate clear of the nav bar.
      className="bg-[#241f1a]/95 p-[5vw] pb-32 lg:pb-[5vw]"
    >
      <OverlayClose
        onClick={onClose}
        className="absolute top-7 right-8 h-12 w-12 border-cream/40 text-cream hover:bg-cream/15"
      />
      {shot && (
        <div className="relative h-[70vh] w-[90vw] lg:h-[86vh]">
          <StudioImage
            src={shot.src}
            alt={shot.alt}
            sizes="90vw"
            className="rounded-sm object-contain"
          />
        </div>
      )}
      {shot && index !== null && (
        <LightboxNav
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          counter={`${pad(index + 1)} / ${pad(shots.length)}`}
          caption={shot.alt}
        />
      )}
      a
    </Overlay>
  )
}
