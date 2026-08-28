'use client'

import { OverlayClose } from '@/components/primitives/Overlay'
import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Side arrows only appear from `lg` up, where the overlay padding leaves gutter
 * either side of the plate. Below that the plate is 90vw, so an arrow pinned to
 * the viewport edge lands on the photograph itself — a cream hairline over a
 * dark image reads as a smudge, and the tap target fights the image.
 */
const sideButton =
  'absolute top-1/2 hidden h-[54px] w-[54px] -translate-y-1/2 border-cream/40 text-2xl text-cream hover:bg-cream/15 lg:flex'

/** The small-screen pair, sat in the bottom bar on their own dark ground. */
const barButton =
  'h-11 w-11 shrink-0 border-cream/30 bg-cream/5 text-2xl leading-none text-cream active:bg-cream/20 lg:hidden'

/**
 * Prev/next controls and the caption strip shared by the lightboxes.
 *
 * Two layouts, one markup: side arrows on desktop, and below `lg` a floating
 * bar under the plate — prev, counter, next inside a blurred pill that keeps
 * the controls legible over any photograph. The bar itself lets clicks through
 * so the backdrop still dismisses around it.
 */
export const LightboxNav: React.FC<{
  onPrev: () => void
  onNext: () => void
  /** Position within the set, e.g. `01 / 06`. */
  counter: React.ReactNode
  caption?: React.ReactNode
}> = ({ onPrev, onNext, counter, caption }) => (
  <>
    <OverlayClose onClick={onPrev} label="Previous" className={cn(sideButton, 'left-7')}>
      &#8249;
    </OverlayClose>
    <OverlayClose onClick={onNext} label="Next" className={cn(sideButton, 'right-7')}>
      &#8250;
    </OverlayClose>

    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-[5vw] pb-5 text-center lg:flex-row-reverse lg:justify-center lg:gap-3.5 lg:pb-6">
      {caption && <p className="max-w-full truncate text-nav text-cream/70">{caption}</p>}

      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-cream/15 bg-ink/75 p-1.5 backdrop-blur-md lg:pointer-events-none lg:gap-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <OverlayClose onClick={onPrev} label="Previous" className={barButton}>
          &#8249;
        </OverlayClose>

        <span className="px-2 text-nav tracking-[0.16em] text-cream/70 lg:px-0">{counter}</span>

        <OverlayClose onClick={onNext} label="Next" className={barButton}>
          &#8250;
        </OverlayClose>
      </div>
    </div>
  </>
)
