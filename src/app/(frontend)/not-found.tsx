import { Container } from '@/components/primitives/Container'
import { CtaLink } from '@/components/primitives/Cta'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import React from 'react'

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-2xl md:py-3xl">
      <Container>
        <Eyebrow className="mb-md">Error 404</Eyebrow>
        <h1 className="max-w-[18ch] text-h1">This page could not be found.</h1>
        <p className="mt-md max-w-[42ch] text-body-lg text-espresso-soft">
          The page you were looking for has moved, or never existed.
        </p>
        <CtaLink href="/" className="mt-xl">
          Return home
        </CtaLink>
      </Container>
    </main>
  )
}
