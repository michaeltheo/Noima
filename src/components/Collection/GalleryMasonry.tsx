'use client'

import type { GalleryItem } from './types'

import { Media } from '@/components/Media'
import { Container } from '@/components/primitives/Container'
import { LightboxFallback } from '@/components/primitives/LightboxFallback'
import { Reveal } from '@/components/primitives/Reveal'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import React, { lazy, Suspense, useState } from 'react'

import { PlayBadge } from './PlayBadge'
import { VideoDuration } from './VideoDuration'

// Held back until a tile is opened — the masonry itself never needs it.
const importLightbox = () =>
  import('./GalleryLightbox').then((m) => ({ default: m.GalleryLightbox }))
const GalleryLightbox = lazy(importLightbox)

/** Fetch the chunk on approach, so the click itself has nothing to wait for. */
const warm = () => {
  importLightbox().catch(() => {
    // Ignored — React retries the import when the lightbox actually renders.
  })
}

/**
 * One continuous masonry of every tile in the album — three columns, dropping
 * to two then one. Photos keep their natural proportions; videos show their
 * poster with a play badge. Any tile opens the lightbox.
 */
export const GalleryMasonry: React.FC<{ items: GalleryItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // Sticks at true after the first open so Overlay keeps its closing animation.
  const [everOpened, setEverOpened] = useState(false)

  const open = (index: number) => {
    setEverOpened(true)
    setOpenIndex(index)
  }
  const close = () => setOpenIndex(null)

  if (!items.length) {
    return (
      <Container>
        <p className="pb-3xl text-body-lg text-espresso-soft">
          Nothing has been added to this album yet.
        </p>
      </Container>
    )
  }

  return (
    <section className="pt-xl pb-3xl" onPointerEnter={warm} onFocusCapture={warm}>
      <Container>
        <div className="columns-1 gap-md md:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={item.key} delay={Math.min(i % 4, 3) * 0.05} className="mb-md">
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Open ${item.media.alt || 'item'} ${i + 1} of ${items.length}`}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-[4px] bg-cream-card after:absolute after:inset-0 after:bg-espresso/0 after:transition-colors after:duration-500 after:ease-noima hover:after:bg-espresso/8"
              >
                <Media
                  resource={item.kind === 'photo' ? item.media : item.poster}
                  size="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  imgClassName="w-full h-auto group-hover:scale-105 motion-reduce:transform-none"
                />

                {item.kind === 'video' && (
                  <>
                    <PlayBadge />
                    {item.media.url && (
                      <VideoDuration src={getMediaUrl(item.media.url, item.media.updatedAt)} />
                    )}
                  </>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {everOpened && (
        <Suspense
          fallback={
            <LightboxFallback
              label="Loading media"
              onClose={close}
              plateClassName="h-[88vh] w-[90vw]"
            />
          }
        >
          <GalleryLightbox
            items={items}
            index={openIndex}
            onChange={setOpenIndex}
            onClose={close}
          />
        </Suspense>
      )}
    </section>
  )
}
