import { Container } from '@/components/primitives/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { mapsUrl, studio } from '@/config/studio'
import { siteConfig } from '@/config/site'
import React from 'react'

import { AddressRow } from './AddressRow'
import { StudioMap } from './StudioMap'

const linkClass =
  'border-b border-line transition-colors duration-300 ease-noima hover:text-clay-deep'

export const FindUs: React.FC = () => (
  <section id="find" className="scroll-mt-header py-2xl">
    <Container size="page">
      <Reveal className="mb-xl">
        <Eyebrow>Find us</Eyebrow>
        <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06] font-light tracking-[-0.03em]">
          Where the studio is.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-xl lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="flex flex-col gap-md">
          <AddressRow label="Address">
            {studio.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </AddressRow>

          <AddressRow label="Getting here">{studio.transit}</AddressRow>

          <AddressRow label="Studio">
            <a href={`mailto:${studio.email}`} className={linkClass}>
              {studio.email}
            </a>
          </AddressRow>

          <AddressRow label="Directions">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Open in maps &#8594;
            </a>
          </AddressRow>
        </Reveal>

        <Reveal delay={0.08}>
          <StudioMap
            lat={studio.coordinates.lat}
            lon={studio.coordinates.lon}
            label={`${siteConfig.name} Studio`}
            address={studio.address.join(', ')}
          />
        </Reveal>
      </div>
    </Container>
  </section>
)
