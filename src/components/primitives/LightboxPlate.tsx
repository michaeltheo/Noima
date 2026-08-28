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

/**
 * The photograph plate in a lightbox: tapping the photograph itself advances
 * to the next one, and anywhere beside it dismisses, so the letterboxing keeps
 * the same meaning as the backdrop around it.
 *
 * Not focusable, and carries no `role` — everything it does is already on the
 * keyboard through the arrow keys, Escape, and the nav buttons, so announcing
 * a second button here would only add a stop that repeats them.
 */
export const LightboxPlate: React.FC<{
  onNext: () => void
  onClose: () => void
  className?: string
  children: React.ReactNode
}> = ({ onNext, onClose, className, children }) => (
  <div
    onClick={(event) => {
      const img = event.currentTarget.querySelector('img')
      if (img && onPhotograph(img, event.clientX, event.clientY)) onNext()
      else onClose()
    }}
    className={cn('relative cursor-pointer', className)}
  >
    {children}
  </div>
)
