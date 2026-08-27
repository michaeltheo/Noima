import { Container } from '@/components/primitives/Container'
import { Logo } from '@/components/Logo'
import { footerNav } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import React from 'react'

import { FooterNav } from './FooterNav'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-espresso pt-lg pb-md text-cream">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-md">
          <Link href="/" aria-label={`${siteConfig.name} — home`}>
            <Logo variant="cream" className="text-[1.25rem]" />
          </Link>
          <FooterNav items={footerNav} instagram={siteConfig.instagram} />
        </div>

        <div className="mt-md flex flex-wrap justify-between gap-sm border-t border-cream/12 pt-sm text-meta text-cream/45">
          <span>
            &copy; {year} {siteConfig.name} &middot; {siteConfig.city}
          </span>
          <span>
            Website Design &amp; Development by{' '}
            <a
              href={siteConfig.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-cream/25 transition-colors duration-300 ease-noima hover:text-clay"
            >
              {siteConfig.credit.label}
            </a>
          </span>
        </div>
      </Container>
    </footer>
  )
}
