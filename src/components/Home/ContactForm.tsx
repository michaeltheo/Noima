'use client'

import { Cta } from '@/components/primitives/Cta'
import React, { useState, useTransition } from 'react'

import { ContactField, ContactTextarea } from './ContactField'
import { type EnquiryResult, sendEnquiry } from './sendEnquiry'

/**
 * Enquiry form. Sends through the `sendEnquiry` server action and clears the
 * fields only once the email is accepted, so a failed send keeps the message.
 */
export const ContactForm: React.FC = () => {
  const [result, setResult] = useState<EnquiryResult | null>(null)
  const [pending, startTransition] = useTransition()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setResult(null)
    startTransition(async () => {
      const response = await sendEnquiry(formData).catch((): EnquiryResult => ({
        ok: false,
        error: 'Could not send — please try again.',
      }))
      if (response.ok) form.reset()
      setResult(response)
    })
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

      <Cta
        type="submit"
        disabled={pending}
        className="mt-sm self-start disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Send enquiry'}
      </Cta>

      <p aria-live="polite" className="text-body-sm text-clay-deep">
        {result?.ok ? 'Thank you — we will be in touch shortly.' : (result?.error ?? '')}
      </p>
    </form>
  )
}
