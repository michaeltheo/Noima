import { headerCta, headerNav, mobileNav } from '@/config/navigation'
import React from 'react'

import { HeaderClient } from './HeaderClient'

/**
 * Server boundary for the header. Navigation is read from `@/config/navigation`
 * for now; when the admin panel lands this is where the Payload global is fetched.
 */
export function Header() {
  return <HeaderClient navItems={headerNav} cta={headerCta} mobileItems={mobileNav} />
}
