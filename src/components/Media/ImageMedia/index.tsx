'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import { CREAM_PLACEHOLDER, useImageFade } from '@/utilities/useImageFade'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

/**
 * Payload media rendered through next/image.
 *
 * `getMediaUrl` builds an absolute URL from the stored relative path, which
 * Next then optimises via the `remotePatterns` in next.config.
 */
export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  const { ref, onLoad, fadeClass } = useImageFade()

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    // No cache tag: a query string makes Next's optimizer pass the original
    // file through untouched (4x larger). Payload writes a new filename when a
    // file is replaced, so the URL still changes when the image does.
    src = getMediaUrl(url)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // Tells the browser which rendition to download. Callers should pass a real
  // `size` for anything narrower than the viewport.
  const sizes = sizeFromProps ?? '100vw'

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        ref={ref}
        onLoad={onLoad}
        alt={alt || ''}
        className={cn(fadeClass, imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder="blur"
        blurDataURL={CREAM_PLACEHOLDER}
        priority={priority}
        quality={82}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
