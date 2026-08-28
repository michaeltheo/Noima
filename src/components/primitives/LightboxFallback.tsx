'use client'

import { BrandLoader } from '@/components/primitives/BrandLoader'
import { Overlay } from '@/components/primitives/Overlay'
import { cn } from '@/utilities/ui'
import React from 'react'

const ghost = 'absolute rounded-full border border-cream/15'

/**
 * Stands in for a lightbox whose code has not arrived yet.
 *
 * Mirrors the lightbox's own geometry — plate, control circles, and the
 * small-screen nav bar — so the real thing resolves into place without
 * anything moving, and holds the wordmark on the darkroom bloom
 * (`.is-developing`) rather than a spinner. The controls are drawn at a dimmer
 * cream so they read as placeholders instead of buttons that refuse to respond.
 *
 * Escape and backdrop clicks still dismiss, so a slow chunk never traps anyone
 * behind a screen they cannot leave.
 */
export const LightboxFallback: React.FC<{
  label?: string
  onClose: () => void
  /** Match the plate to the lightbox it stands in for. */
  plateClassName?: string
}> = ({
  label = 'Loading photograph',
  onClose,
  plateClassName = 'h-[70vh] max-h-full w-[90vw] lg:h-[86vh]',
}) => (
  <Overlay
    open
    onClose={onClose}
    label={label}
    className="is-surfacing bg-[#241f1a]/95 p-[5vw] pt-24 pb-32 lg:pt-[5vw] lg:pb-[5vw]"
  >
    <div aria-hidden className={cn(ghost, 'top-5 right-5 h-12 w-12 lg:top-7 lg:right-8')} />
    <div
      aria-hidden
      className={cn(ghost, 'top-1/2 left-7 hidden h-13.5 w-13.5 -translate-y-1/2 lg:block')}
    />
    <div
      aria-hidden
      className={cn(ghost, 'top-1/2 right-7 hidden h-13.5 w-13.5 -translate-y-1/2 lg:block')}
    />

    <div className={cn('is-developing grid place-items-center rounded-sm', plateClassName)}>
      <BrandLoader variant="cream" label={label} />
    </div>

    <div
      aria-hidden
      className="absolute bottom-5 left-1/2 flex h-14 w-40 -translate-x-1/2 items-center justify-between rounded-full border border-cream/10 p-1.5 lg:hidden"
    >
      <div className="h-11 w-11 rounded-full border border-cream/15" />
      <div className="h-11 w-11 rounded-full border border-cream/15" />
    </div>
  </Overlay>
)
