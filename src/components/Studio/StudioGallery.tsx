'use client'

import type { Shot } from '@/config/studio'

import { Container } from '@/components/primitives/Container'
import { LightboxFallback } from '@/components/primitives/LightboxFallback'
import { Reveal } from '@/components/primitives/Reveal'
import { cn } from '@/utilities/ui'
import React, { lazy, Suspense, useState } from 'react'

import { StudioImage } from './StudioImage'

// The lightbox is dead weight for everyone who only scrolls the gallery, so its
// code waits until a shot is actually opened. `lazy` wants a default export.
const importLightbox = () => import('./Lightbox').then((m) => ({ default: m.Lightbox }))
const Lightbox = lazy(importLightbox)

/** Fetch the chunk on approach, so the click itself has nothing to wait for. */
const warm = () => {
  importLightbox().catch(() => {
    // Ignored — React retries the import when the lightbox actually renders,
    // and surfaces the failure there instead of as an unhandled rejection.
  })
}

const frame =
  'group relative w-full cursor-pointer overflow-hidden rounded-[4px] bg-cream-card after:absolute after:inset-0 after:bg-espresso/0 after:transition-colors after:duration-500 after:ease-noima hover:after:bg-espresso/10'

const picture =
  // No `transition-*` here — useImageFade owns the transition for both the
  // load reveal and this hover scale. See the note in that hook.
  'object-cover group-hover:scale-105 motion-reduce:transform-none'

export const StudioGallery: React.FC<{ shots: Shot[] }> = ({ shots }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // Sticks at true after the first open so Overlay keeps its closing animation.
  const [everOpened, setEverOpened] = useState(false)
  const [lead, ...rest] = shots

  const open = (index: number) => {
    setEverOpened(true)
    setOpenIndex(index)
  }
  const close = () => setOpenIndex(null)

  return (
    <section className="pb-2xl" onPointerEnter={warm} onFocusCapture={warm}>
      <Container size="page">
        {lead && (
          <Reveal>
            <button
              type="button"
              aria-label={`View ${lead.alt}`}
              onClick={() => open(0)}
              className={cn(frame, 'aspect-4/3 md:aspect-16/7')}
            >
              <StudioImage
                src={lead.src}
                alt={lead.alt}
                sizes="100vw"
                className={picture}
                priority
              />
            </button>
          </Reveal>
        )}

        <div className="mt-sm grid grid-cols-1 gap-sm md:grid-cols-3">
          {rest.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 0.06}>
              <button
                type="button"
                aria-label={`View ${shot.alt}`}
                onClick={() => open(i + 1)}
                className={cn(frame, 'aspect-4/5')}
              >
                <StudioImage
                  src={shot.src}
                  alt={shot.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={picture}
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {everOpened && (
        <Suspense fallback={<LightboxFallback onClose={close} />}>
          <Lightbox shots={shots} index={openIndex} onChange={setOpenIndex} onClose={close} />
        </Suspense>
      )}
    </section>
  )
}
