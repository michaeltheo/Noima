'use client'

import { useCallback, useState } from 'react'

/**
 * Blur-up reveal for an image, run once it has decoded.
 *
 * Spread the result onto a `next/image`. Three things matter here:
 *
 * 1. The `ref`. A cached image can finish loading before React hydrates, so
 *    `onLoad` never fires and the image would stay invisible forever. The ref
 *    callback checks `complete` at attach time to cover that, and being a ref
 *    callback rather than an effect it does not trip set-state-in-effect.
 *
 * 2. The transition property list. Tailwind v4 compiles `scale-*` and
 *    `translate-*` to the standalone `scale` and `translate` CSS properties,
 *    NOT to `transform`. Listing `transform` therefore animates nothing — the
 *    change snaps. Name `scale` and `translate` explicitly.
 *
 * 3. A single transition declaration. `cn()` runs tailwind-merge, which keeps
 *    only the last conflicting `transition-*`, so a caller adding its own would
 *    silently delete this one. Callers must not set `transition-*`; this
 *    covers their hover scale too.
 */
export const useImageFade = () => {
  const [loaded, setLoaded] = useState(false)

  const ref = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true)
  }, [])

  return {
    loaded,
    ref,
    onLoad: () => setLoaded(true),
    fadeClass: [
      'transition-[opacity,scale,translate,filter] duration-1000 ease-noima',
      // The slight overscale hides the soft edge the blur leaves behind.
      loaded ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-[1.03] blur-md',
      'motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:blur-none',
    ].join(' '),
  }
}

/**
 * 1×1 PNG of --cream-card, used as the blur placeholder so a loading image
 * shows brand colour rather than the template's grey-blue stock blur.
 */
export const CREAM_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mN4//IeAAWBAreozfRRAAAAAElFTkSuQmCC'
