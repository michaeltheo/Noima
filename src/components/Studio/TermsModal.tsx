'use client'

import type { Term } from '@/config/studio'

import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Overlay, OverlayClose } from '@/components/primitives/Overlay'
import React from 'react'

export const TermsModal: React.FC<{
  terms: Term[]
  open: boolean
  onClose: () => void
}> = ({ terms, open, onClose }) => (
  <Overlay
    open={open}
    onClose={onClose}
    label="Studio rental terms and conditions"
    className="bg-[#241f1a]/50 p-6 backdrop-blur-[5px]"
  >
    <div
      className={`relative max-h-[86vh] w-full max-w-[720px] overflow-y-auto rounded-lg border border-line bg-cream p-[clamp(30px,4.5vw,54px)] shadow-[0_40px_90px_-28px_rgba(36,31,26,0.55)] transition-transform duration-500 ease-noima ${
        open ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'
      }`}
    >
      <OverlayClose
        onClick={onClose}
        className="absolute top-4 right-5 h-10 w-10 border-line text-espresso hover:bg-cream-deep"
      />

      <Eyebrow>Studio rental</Eyebrow>
      <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.06] font-light tracking-[-0.03em]">
        Terms &amp; conditions
      </h2>

      <div className="mt-lg flex flex-col gap-md">
        {terms.map((term) => (
          <section key={term.heading} className="border-t border-line pt-4">
            <h3 className="text-num tracking-[0.18em] text-clay-deep uppercase">{term.heading}</h3>
            <p className="mt-[7px] text-[0.9375rem] text-espresso-soft">{term.body}</p>
          </section>
        ))}
      </div>
    </div>
  </Overlay>
)
