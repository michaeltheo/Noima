'use client'

import type { Shot } from '@/config/studio'

import { LightboxNav } from '@/components/primitives/LightboxNav'
import { LightboxPlate } from '@/components/primitives/LightboxPlate'
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
      {shot && (
        <LightboxPlate
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onClose={onClose}
          className="h-[70vh] max-h-full w-[90vw] lg:h-[86vh]"
        >
          <StudioImage
            src={shot.src}
            alt={shot.alt}
            sizes="90vw"
            className="rounded-sm object-contain"
          />
        </LightboxPlate>
      )}
      {shot && index !== null && (
        <LightboxNav
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          counter={`${pad(index + 1)} / ${pad(shots.length)}`}
          caption={shot.alt}
        />
      )}
    </Overlay>
  )
}
