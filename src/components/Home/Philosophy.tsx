import { Container } from '@/components/primitives/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import React from 'react'

export const Philosophy: React.FC = () => (
  <section id="about" className="border-y border-line bg-cream-deep py-2xl md:py-3xl">
    <Container>
      <div className="mx-auto max-w-[980px] text-center">
        <Reveal>
          <Eyebrow className="mb-lg">The philosophy</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="font-display text-quote before:mx-auto before:mb-lg before:block before:h-px before:w-11 before:bg-clay/60 before:content-['']">
            NOIMA means <em className="not-italic font-normal text-clay-deep">meaning</em>. We
            believe a beautiful life is not loud — it is felt in the texture of a room, the warmth
            of a meal, the weight of good cloth.
          </blockquote>
        </Reveal>
      </div>
    </Container>
  </section>
)
