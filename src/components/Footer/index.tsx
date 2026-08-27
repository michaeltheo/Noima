import { Container } from '@/components/primitives/Container'
import { Logo } from '@/components/Logo'
import { Reveal } from '@/components/primitives/Reveal'
import { siteConfig } from '@/config/site'
import { getNavigation } from '@/data/navigation'
import Link from 'next/link'
import React from 'react'

import { FooterNav } from './FooterNav'

export async function Footer() {
  const { footerItems } = await getNavigation()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-espresso pt-lg pb-md text-cream">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-md">
          <Link href="/" aria-label={`${siteConfig.name} — home`}>
            <Logo variant="cream" className="h-[26px] md:h-[30px]" />
          </Link>
          <FooterNav items={footerItems} instagram={siteConfig.instagram} />
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-md flex flex-wrap justify-between gap-sm border-t border-cream/12 pt-sm text-meta text-cream/45"
        >
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
        </Reveal>
      </Container>
    </footer>
  )
}
