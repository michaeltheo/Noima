import { Reveal } from '@/components/primitives/Reveal'
import { siteConfig } from '@/config/site'
import React from 'react'

const rows = [
  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
]

export const ContactDetails: React.FC = () => (
  <div className="mt-xl flex flex-col gap-md">
    {rows.map((row, i) => (
      <Reveal key={row.label} delay={i * 0.08}>
        <div className="border-t border-line pt-3.5">
          <div className="text-label text-espresso-soft uppercase">{row.label}</div>
          <a
            href={row.href}
            className="mt-1 block font-display text-value transition-colors duration-300 ease-noima hover:text-clay-deep"
          >
            {row.value}
          </a>
        </div>
      </Reveal>
    ))}
  </div>
)
