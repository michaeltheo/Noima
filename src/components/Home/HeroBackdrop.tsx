import { heroMedia } from '@/config/site'
import Image from 'next/image'
import React from 'react'

/**
 * Full-bleed hero backdrop. Plays footage when `heroMedia.video` is set and
 * otherwise rests on the poster still. The cream scrim keeps the headline legible.
 */
export const HeroBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-cream-deep">
    {heroMedia.video ? (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroMedia.poster}
        className="h-full w-full object-cover"
      >
        <source src={heroMedia.video} type="video/mp4" />
      </video>
    ) : (
      <Image
        src={heroMedia.poster}
        alt={heroMedia.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    )}

    <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(245,241,234,0.92)_0%,rgba(245,241,234,0.72)_42%,rgba(245,241,234,0.34)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(58,51,44,0.14),transparent_40%)]" />
  </div>
)
