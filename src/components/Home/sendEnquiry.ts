'use server'

import { siteConfig } from '@/config/site'
import { Resend } from 'resend'

export type EnquiryResult = { ok: true } | { ok: false; error: string }

/** Sender on the domain verified in Resend. */
const FROM = `${siteConfig.name} Website <website@noima-jt.gr>`
const TO = 'noimajt@gmail.com'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field = (formData: FormData, key: string, max: number): string =>
  String(formData.get(key) ?? '')
    .trim()
    .slice(0, max)

/** Sends a contact-form enquiry to the NOIMA inbox via Resend. */
export async function sendEnquiry(formData: FormData): Promise<EnquiryResult> {
  const name = field(formData, 'name', 200)
  const email = field(formData, 'email', 320)
  const message = field(formData, 'message', 5000)

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Please fill in your name, a valid email and a message.' }
  }

  const apiKey = process.env.RESEND_KEY
  if (!apiKey) {
    console.error('sendEnquiry: RESEND_KEY is not set')
    return { ok: false, error: 'Something went wrong — please email us directly.' }
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: TO,
    replyTo: `${name.replace(/[<>"]/g, '')} <${email}>`,
    subject: `New enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    console.error('sendEnquiry: Resend rejected the email', error)
    return { ok: false, error: 'Something went wrong — please try again or email us directly.' }
  }

  return { ok: true }
}
