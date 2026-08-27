'use client'

import { useCallback, useState } from 'react'
import React from 'react'

const format = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

/**
 * Duration badge for a video tile.
 *
 * Uploaded video is not transcoded, so no duration is stored. Rather than ask
 * the editor to type one, this reads it from the file's metadata (a few KB, not
 * the whole file) and renders nothing until it is known.
 */
export const VideoDuration: React.FC<{ src: string }> = ({ src }) => {
  const [label, setLabel] = useState<string | null>(null)

  const probe = useCallback(
    (node: HTMLSpanElement | null) => {
      if (!node) return

      const video = document.createElement('video')
      video.preload = 'metadata'

      const onLoaded = () => {
        if (Number.isFinite(video.duration)) setLabel(format(video.duration))
      }

      video.addEventListener('loadedmetadata', onLoaded)
      video.src = src

      return () => {
        video.removeEventListener('loadedmetadata', onLoaded)
        video.removeAttribute('src')
        video.load()
      }
    },
    [src],
  )

  return (
    <span ref={probe} className="contents">
      {label && (
        <span className="absolute right-3 bottom-3 z-20 rounded-sm bg-[#241f1a]/70 px-2.5 py-0.5 text-[0.75rem] tracking-wider text-cream">
          {label}
        </span>
      )}
    </span>
  )
}
