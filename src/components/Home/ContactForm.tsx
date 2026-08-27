'use client'

import { Cta } from '@/components/primitives/Cta'
import React, { useState } from 'react'

import { ContactField, ContactTextarea } from './ContactField'

/**
 * Enquiry form. Submission is a local stub until the Payload form-builder
 * endpoint exists — wire `handleSubmit` to it when the admin panel lands.
 */
export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md">
      <ContactField id="name" label="Name" type="text" placeholder="Your name" required />
      <ContactField id="email" label="Email" type="email" placeholder="you@email.com" required />
      <ContactTextarea
        id="message"
        label="Message"
        placeholder="Tell us what you have in mind"
        required
      />

      <Cta type="submit" className="mt-sm self-start">
        Send enquiry
      </Cta>

      <p aria-live="polite" className="text-body-sm text-clay-deep">
        {submitted ? 'Thank you — we will be in touch shortly.' : ''}
      </p>
    </form>
  )
}
