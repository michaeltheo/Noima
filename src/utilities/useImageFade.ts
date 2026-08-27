'use client'

import { useCallback, useState } from 'react'

/**
 * Blur-up reveal for an image, run once it has decoded.
 *
 * Spread the result onto a `next/image`. Two things matter here:
 *
 * 1. The `ref`. A cached image can finish loading before React hydrates, so
 *    `onLoad` never fires and the image would stay invisible forever. The ref
 *    callback checks `complete` at attach time to cover that, and being a ref
 *    callback rather than an effect it does not trip set-state-in-effect.
 *
 * 2. The single `transition-[opacity,transform,filter]` declaration. `cn()` runs
 *    tailwind-merge, which collapses conflicting transition utilities and keeps
 *    the last one — so a caller passing `transition-transform` for its hover
 *    scale would silently delete a separate `transition-opacity` here and the
 *    image would pop in. Callers must therefore NOT set `transition-*`
 *    themselves; this covers the hover scale too.
 */
export const useImageFade = () => {
  const [loaded, setLoaded] = useState(false)

  const ref = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true)
  }, [])

  return {
    ref,
    onLoad: () => setLoaded(true),
    fadeClass: [
      'transition-[opacity,transform,filter] duration-1000 ease-noima',
      // The slight overscale hides the soft edge the blur leaves behind.
      loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.03] blur-md',
      'motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:blur-0',
    ].join(' '),
  }
}

/**
 * 1×1 PNG of --cream-card, used as the blur placeholder so a loading image
 * shows brand colour rather than the template's grey-blue stock blur.
 */
export const CREAM_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mN4//IeAAWBAreozfRRAAAAAElFTkSuQmCC'
