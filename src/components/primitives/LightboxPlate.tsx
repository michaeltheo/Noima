'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * `object-contain` paints the photograph inside the plate at its own aspect
 * ratio, so a portrait shot leaves wide bands of empty box either side. Those
 * bands read as backdrop, and a click there should behave like one. The
 * element's own bounds can't tell the two apart, so the painted rectangle is
 * worked back out from the image's natural size.
 *
 * Returns true before the image has loaded (`naturalWidth` still 0), when
 * there is nothing else the click could sensibly mean.
 */
const onPhotograph = (img: HTMLImageElement, clientX: number, clientY: number) => {
  const box = img.getBoundingClientRect()
  const { naturalHeight, naturalWidth } = img
  if (!naturalWidth || !naturalHeight) return true

  const scale = Math.min(box.width / naturalWidth, box.height / naturalHeight)
  const width = naturalWidth * scale
  const height = naturalHeight * scale
  const x = clientX - box.left - (box.width - width) / 2
  const y = clientY - box.top - (box.height - height) / 2

  return x >= 0 && x <= width && y >= 0 && y <= height
}

/** Drag further than this and letting go moves a photograph. */
const THRESHOLD = 56

/** Under this the gesture is a tap that happened to wobble, not a swipe. */
const SLOP = 8

/**
 * True from the `lg` breakpoint up, where a mouse drag is worth honouring.
 * Read from the theme rather than hardcoded, so it follows `tokens.css` if the
 * breakpoint moves. The list is built once — the value never changes, only
 * whether it matches.
 */
let large: MediaQueryList | undefined
const onLargeScreen = () => {
  large ??= window.matchMedia(
    `(min-width: ${getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg') || '64rem'})`,
  )
  return large.matches
}

type Drag = {
  /** Pixels the plate is currently held from its resting place. */
  offset: number
  /** Whether to ease back to `offset` rather than jump there. */
  settle: boolean
}

const AT_REST: Drag = { offset: 0, settle: false }

/**
 * The photograph plate in a lightbox.
 *
 * Tapping the photograph itself advances to the next one, and anywhere beside
 * it dismisses, so the letterboxing keeps the same meaning as the backdrop
 * around it. Dragging sideways carries the photograph along and moves a slide
 * on release — always with a finger, and with a mouse from `lg` up, where the
 * lightbox is its desktop self and a drag across a wide plate reads as
 * browsing the set.
 *
 * Not focusable, and carries no `role` — everything it does is already on the
 * keyboard through the arrow keys, Escape, and the nav buttons, so announcing
 * a second button here would only add a stop that repeats them.
 */
export const LightboxPlate: React.FC<{
  onPrev: () => void
  onNext: () => void
  onClose: () => void
  className?: string
  children: React.ReactNode
}> = ({ onPrev, onNext, onClose, className, children }) => {
  const origin = React.useRef<number | null>(null)
  const carries = React.useRef(false)
  const swiped = React.useRef(false)
  const [drag, setDrag] = React.useState<Drag>(AT_REST)

  const release = (event: React.PointerEvent<HTMLDivElement>) => {
    if (origin.current === null) return
    const delta = event.clientX - origin.current
    origin.current = null

    // A drag this plate doesn't carry moves nothing — it was only tracked far
    // enough to know it wasn't a click, so the release doesn't land as one.
    if (!carries.current) return

    // A committed swipe lands on a different photograph, so easing the empty
    // plate back would drag the new image in from the side it left towards.
    // Only a gesture that fell short travels back to where it started.
    if (delta <= -THRESHOLD) onNext()
    else if (delta >= THRESHOLD) onPrev()
    else return setDrag({ offset: 0, settle: true })

    setDrag(AT_REST)
  }

  return (
    <div
      onPointerDown={(event) => {
        if (!event.isPrimary) return
        origin.current = event.clientX
        // A finger swipes at any size; a mouse only on a large screen. Below
        // `lg` a drag that isn't a finger is tracked but goes nowhere, rather
        // than doing something halfway.
        carries.current = event.pointerType === 'touch' || onLargeScreen()
        swiped.current = false
        // Keeps the move and up events coming once the pointer leaves the
        // plate, which a fast swipe across a 90vw box does routinely — and
        // keeps the click that follows on the plate, where it can be ignored.
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (origin.current === null) return
        const offset = event.clientX - origin.current
        if (Math.abs(offset) > SLOP) swiped.current = true
        if (carries.current) setDrag({ offset, settle: false })
      }}
      onPointerUp={release}
      onPointerCancel={() => {
        origin.current = null
        setDrag({ offset: 0, settle: true })
      }}
      onClick={(event) => {
        // A swipe ends in a click too. Without this the same gesture would move
        // a slide and then count as a tap on the photograph, skipping one — and
        // a drag released beside the photograph would dismiss the lightbox.
        // The pointer capture above is what keeps that click on the plate
        // rather than on whatever the pointer was over when it was let go.
        if (swiped.current) return

        const img = event.currentTarget.querySelector('img')
        if (img && onPhotograph(img, event.clientX, event.clientY)) onNext()
        else onClose()
      }}
      // Mouse drags would otherwise pick the photograph up as a drag image.
      onDragStart={(event) => event.preventDefault()}
      style={{ transform: `translateX(${drag.offset}px)` }}
      // `touch-pan-y` hands horizontal gestures to the handlers above while
      // leaving the browser its own vertical ones.
      className={cn(
        'relative cursor-pointer touch-pan-y select-none',
        drag.settle && 'transition-transform duration-200 ease-out',
        className,
      )}
    >
      {children}
    </div>
  )
}
