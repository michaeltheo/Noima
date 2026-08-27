'use client'

import type { NavItem, NavLink } from '@/config/navigation'

import { Logo } from '@/components/Logo'
import { siteConfig } from '@/config/site'
import { cn } from '@/utilities/ui'
import { useScrolled } from '@/utilities/useScrolled'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { Burger } from './Burger'
import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'

const MOBILE_MENU_ID = 'mobile-menu'

type HeaderClientProps = {
  navItems: NavItem[]
  cta: NavLink
  mobileItems: NavLink[]
}

/**
 * Fixed header. Transparent over the hero, then settles into a blurred cream
 * bar once the page scrolls.
 */
export const HeaderClient: React.FC<HeaderClientProps> = ({ navItems, cta, mobileItems }) => {
  const scrolled = useScrolled()
  // The drawer closes from `onNavigate` on each link, so no route listener is needed.
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 ease-noima',
          scrolled &&
            'border-clay-deep/15 bg-cream-warm/85 shadow-[0_10px_30px_-22px_rgba(58,51,44,0.5)] backdrop-blur-lg',
        )}
      >
        <div className="mx-auto flex h-header-sm w-full max-w-(--container-site) items-center justify-between px-[clamp(24px,5vw,72px)] md:h-header">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="relative z-50">
            <Logo />
          </Link>

          <DesktopNav items={navItems} cta={cta} pathname={pathname} />

          <Burger
            open={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            controls={MOBILE_MENU_ID}
          />
        </div>
      </header>

      <MobileMenu
        id={MOBILE_MENU_ID}
        items={mobileItems}
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
      />
    </>
  )
}
