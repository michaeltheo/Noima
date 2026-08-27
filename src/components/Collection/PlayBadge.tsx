import React from 'react'

/** Centred play affordance over a video tile's poster. */
export const PlayBadge: React.FC = () => (
  <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
    <span className="flex size-16 items-center justify-center rounded-full bg-cream/90 text-espresso transition-[transform,background-color] duration-400 ease-noima group-hover:scale-[1.08] group-hover:bg-cream motion-reduce:group-hover:transform-none">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-[3px] size-6">
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
    </span>
  </span>
)
