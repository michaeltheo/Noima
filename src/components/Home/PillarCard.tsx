import type { Pillar } from '@/config/pillars'

import { ExploreLink } from '@/components/primitives/ExploreLink'
import Image from 'next/image'
import React from 'react'

export const PillarCard: React.FC<{ pillar: Pillar }> = ({ pillar }) => (
  <article id={pillar.id} className="group flex scroll-mt-header flex-col">
    <div className="relative h-[62vh] max-h-[480px] w-full overflow-hidden lg:h-[380px] xl:h-[480px]">
      <Image
        src={pillar.image.src}
        alt={pillar.image.alt}
        fill
        sizes="(max-width: 860px) 100vw, 33vw"
        className="object-cover transition-transform duration-1000 ease-noima group-hover:scale-[1.03]"
      />

      {/* Scrim + label, revealed together on hover. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(46,40,34,0.34),transparent_44%)] opacity-0 transition-opacity duration-600 ease-noima group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-5 left-[22px] z-20 flex translate-y-2.5 items-center gap-2.5 text-link text-cream uppercase opacity-0 transition-[opacity,transform] duration-500 ease-noima group-hover:translate-y-0 group-hover:opacity-100">
        View collection &#8594;
      </span>
    </div>

    <div className="mt-md flex items-baseline gap-3.5">
      <span className="pt-2 text-num text-clay-deep">{pillar.index}</span>
      <h3 className="text-h3 whitespace-pre-line">{pillar.title}</h3>
    </div>

    <p className="mt-3.5 max-w-full text-body-sm text-espresso-soft md:max-w-[34ch]">
      {pillar.description}
    </p>

    <ExploreLink href={pillar.href} className="mt-md" />
  </article>
)
