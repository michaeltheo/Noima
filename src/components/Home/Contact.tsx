import { Container } from '@/components/primitives/Container'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import React from 'react'

import { ContactDetails } from './ContactDetails'
import { ContactForm } from './ContactForm'

export const Contact: React.FC = () => (
  <section id="contact" className="scroll-mt-header py-2xl md:py-3xl">
    <Container>
      <div className="grid grid-cols-1 items-start gap-xl md:grid-cols-2 md:gap-2xl">
        <div>
          <Reveal>
            <Eyebrow className="mb-md">Get in touch</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-h1">
              Let&apos;s begin a{' '}
              <em className="not-italic font-normal text-clay-deep">conversation.</em>
            </h2>
          </Reveal>

          <ContactDetails />
        </div>

        <Reveal delay={0.16}>
          <ContactForm />
        </Reveal>
      </div>
    </Container>
  </section>
)
