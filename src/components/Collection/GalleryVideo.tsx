import type { GalleryVideoBlock } from '@/payload-types'

import { Reveal } from '@/components/primitives/Reveal'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import React from 'react'

/**
 * `loop` plays silently and immediately, like the hero b-roll.
 * `player` shows the poster with native controls so the viewer starts it.
 */
export const GalleryVideo: React.FC<{ block: GalleryVideoBlock }> = ({ block }) => {
  const isLoop = block.playback === 'loop'

  const video = typeof block.video === 'object' ? block.video : undefined
  const poster = typeof block.poster === 'object' ? block.poster : undefined

  if (!video?.url) return null

  return (
    <Reveal as="figure">
      <div className="relative w-full overflow-hidden rounded-[4px]">
        <video
          className="h-full w-full object-cover"
          poster={poster?.url ? getMediaUrl(poster.url, poster.updatedAt) : undefined}
          preload={isLoop ? 'auto' : 'metadata'}
          controls={!isLoop}
          autoPlay={isLoop}
          loop={isLoop}
          muted={isLoop}
          playsInline
        >
          <source
            src={getMediaUrl(video.url, video.updatedAt)}
            type={video.mimeType ?? undefined}
          />
        </video>
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-body-sm text-espresso-soft">{block.caption}</figcaption>
      )}
    </Reveal>
  )
}
