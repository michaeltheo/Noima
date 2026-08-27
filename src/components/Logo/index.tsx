'use client'

import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'

/** Artwork lives in public/brand. Both files share the 1280x527 (~2.43:1) ratio. */
const SOURCES = {
  espresso: '/brand/noima-espresso.png',
  cream: '/brand/noima-cream.png',
} as const

type LogoProps = {
  /** `espresso` for the light header, `cream` for the dark footer. */
  variant?: keyof typeof SOURCES
  className?: string
  priority?: boolean
}

/**
 * NOIMA wordmark.
 *
 * Two colourways rather than one recoloured file: the mark is flat single
 * colour, so a CSS filter could fake it, but shipping the real artwork keeps
 * the crescent and the dot crisp at every size.
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
      width={1280}
      height={527}
      sizes="180px"
      priority={priority}
      ref={check}
      onError={() => setFailed(true)}
      className={cn('h-[30px] w-auto select-none', className)}
    />
  )
}
