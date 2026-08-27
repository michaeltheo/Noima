'use client'

import type { Term } from '@/config/studio'

import { Cta, CtaLink } from '@/components/primitives/Cta'
import React, { useState } from 'react'

import { TermsModal } from './TermsModal'

/** Enquire + terms pair. Owns the modal so the section above can stay a server component. */
export const RentalActions: React.FC<{ terms: Term[] }> = ({ terms }) => {
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <div className="mt-xl flex flex-wrap gap-3.5 border-t border-line-soft pt-md">
        <CtaLink href="/#contact" variant="solid">
          Enquire
        </CtaLink>
        <Cta variant="ghost" arrow={false} onClick={() => setTermsOpen(true)}>
          Terms &amp; conditions
        </Cta>
      </div>

      <TermsModal terms={terms} open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  )
}
