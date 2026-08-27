'use client'

import { useScrollLock } from '@/utilities/useScrollLock'
import { cn } from '@/utilities/ui'
import React, { useEffect } from 'react'

/**
 * Shared full-screen overlay behaviour: escape to dismiss, backdrop click to
 * dismiss, and a page-scroll lock while open. Stays mounted so it can animate
 * both ways; children control what sits on top of the backdrop.
 */
export const Overlay: React.FC<{
  open: boolean
  onClose: () => void
  label: string
  /** Backdrop styling — the lightbox is near-opaque, the modal is blurred. */
  className?: string
  children: React.ReactNode
}> = ({ open, onClose, label, className, children }) => {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className={cn(
        'fixed inset-0 z-120 flex items-center justify-center transition-[opacity,visibility] duration-500 ease-noima',
        open ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Round icon button used to close an overlay. */
export const OverlayClose: React.FC<{
  onClick: () => void
  label?: string
  className?: string
  children?: React.ReactNode
}> = ({ onClick, label = 'Close', className, children = '\u2715' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={cn(
      'flex cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ease-noima',
      className,
    )}
  >
    {children}
  </button>
)
