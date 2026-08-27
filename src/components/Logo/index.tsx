'use client'

import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'

/**
 * Colourways built from `public/logo.png` by `pnpm logo:variants`.
 * Both files share the master's 1264x526 (~2.4:1) ratio.
 */
const SOURCES = {
  espresso: '/brand/noima-espresso.png',
  cream: '/brand/noima-cream.png',
} as const

const INTRINSIC = { width: 1264, height: 526 } as const

type LogoProps = {
  /** `espresso` for the light header, `cream` for the dark footer. */
  variant?: keyof typeof SOURCES
  className?: string
  priority?: boolean
}

/**
 * NOIMA wordmark.
 *
 * Two colourways rather than one recoloured file: the mark carries clay and ink
 * at once, so a CSS filter could not flip the type without dragging the ring
 * with it.
 *
 * Falls back to a set wordmark if the artwork is missing, so a renamed or
 * not-yet-committed file degrades to something legible rather than a broken
 * image. Size it with `className` height; the width follows.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'espresso',
  className,
  priority = false,
}) => {
  const [failed, setFailed] = useState(false)

  // A missing image can error before React hydrates, so `onError` alone would
  // never fire. A decoded-but-zero-width image is a failed one.
  const check = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed) {
    return (
      <span
        className={cn(
          'font-display text-[1.5rem] leading-none font-medium tracking-[0.34em] uppercase select-none',
          variant === 'cream' ? 'text-cream' : 'text-espresso',
          className,
        )}
      >
        Noima
      </span>
    )
  }

  return (
    <Image
      src={SOURCES[variant]}
      alt="NOIMA"
      width={INTRINSIC.width}
      height={INTRINSIC.height}
      sizes="220px"
      priority={priority}
      ref={check}
      onError={() => setFailed(true)}
      className={cn('h-[32px] w-auto select-none', className)}
    />
  )
}
