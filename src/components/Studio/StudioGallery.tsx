'use client'

import type { Shot } from '@/config/studio'

import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/primitives/Reveal'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useState } from 'react'

import { Lightbox } from './Lightbox'

const frame =
  'group relative w-full cursor-pointer overflow-hidden rounded-[4px] bg-cream-card after:absolute after:inset-0 after:bg-espresso/0 after:transition-colors after:duration-500 after:ease-noima hover:after:bg-espresso/10'

const picture =
  'object-cover transition-transform duration-1000 ease-noima group-hover:scale-105 motion-reduce:transform-none'

export const StudioGallery: React.FC<{ shots: Shot[] }> = ({ shots }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [lead, ...rest] = shots

  return (
    <section className="pb-2xl">
      <Container>
        {lead && (
          <Reveal>
            <button
              type="button"
              aria-label={`View ${lead.alt}`}
              onClick={() => setOpenIndex(0)}
              className={cn(frame, 'aspect-4/3 md:aspect-[16/7]')}
            >
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
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
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
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
