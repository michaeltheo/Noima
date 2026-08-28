'use client'

import { BrandLoader } from '@/components/primitives/BrandLoader'
import { Overlay } from '@/components/primitives/Overlay'
import { cn } from '@/utilities/ui'
import React from 'react'

const ghost = 'absolute rounded-full border border-cream/15'

/**
 * Stands in for a lightbox whose code has not arrived yet.
 *
 * Mirrors the lightbox's own geometry — plate, control circles — so the real
 * thing resolves into place without anything moving, and holds the wordmark on
 * the darkroom bloom (`.is-developing`) rather than a spinner. The controls are
 * drawn at a dimmer cream so they read as placeholders instead of buttons that
 * refuse to respond.
 *
 * Escape and backdrop clicks still dismiss, so a slow chunk never traps anyone
 * behind a screen they cannot leave.
 */
export const LightboxFallback: React.FC<{
  label?: string
  onClose: () => void
  /** Match the plate to the lightbox it stands in for. */
  plateClassName?: string
}> = ({ label = 'Loading photograph', onClose, plateClassName = 'h-[86vh] w-[90vw]' }) => (
  <Overlay open onClose={onClose} label={label} className="is-surfacing bg-[#241f1a]/95 p-[5vw]">
    <div aria-hidden className={cn(ghost, 'top-7 right-8 h-12 w-12')} />
    <div aria-hidden className={cn(ghost, 'top-1/2 left-7 h-13.5 w-13.5 -translate-y-1/2')} />
    <div aria-hidden className={cn(ghost, 'top-1/2 right-7 h-13.5 w-13.5 -translate-y-1/2')} />

    <div className={cn('is-developing grid place-items-center rounded-sm', plateClassName)}>
      <BrandLoader variant="cream" label={label} />
    </div>
  </Overlay>
)
