'use client'

import type { Shot } from '@/config/studio'

import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'

import { Lightbox } from './Lightbox'
import { StudioImage } from './StudioImage'

const frame =
  'group relative w-full cursor-pointer overflow-hidden rounded-[4px] bg-cream-card after:absolute after:inset-0 after:bg-espresso/0 after:transition-colors after:duration-500 after:ease-noima hover:after:bg-espresso/10'

const picture =
  // No `transition-*` here — useImageFade owns the transition for both the
  // load reveal and this hover scale. See the note in that hook.
  'object-cover group-hover:scale-105 motion-reduce:transform-none'

export const StudioGallery: React.FC<{ shots: Shot[] }> = ({ shots }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [lead, ...rest] = shots

  return (
    <section className="pb-2xl">
      <Container size="page">
        {lead && (
          <Reveal>
            <button
              type="button"
              aria-label={`View ${lead.alt}`}
              onClick={() => setOpenIndex(0)}
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
                onClick={() => setOpenIndex(i + 1)}
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

      <Lightbox
        shots={shots}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
