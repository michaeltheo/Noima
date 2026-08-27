'use client'

import { CREAM_PLACEHOLDER, useImageFade } from '@/utilities/useImageFade'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'

/**
 * Studio photographs come from remote URLs rather than Payload media, so they
 * cannot use <Media>. This keeps them on the same fade + cream placeholder.
 */
export const StudioImage: React.FC<{
  src: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}> = ({ src, alt, sizes, className, priority }) => {
  const { ref, onLoad, fadeClass } = useImageFade()

  return (
    <Image
      ref={ref}
      onLoad={onLoad}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={82}
      placeholder="blur"
      blurDataURL={CREAM_PLACEHOLDER}
      className={cn(fadeClass, className)}
    />
  )
}
