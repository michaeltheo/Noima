import { getNavigation } from '@/data/navigation'
import React from 'react'

import { HeaderClient } from './HeaderClient'

/**
 * Server boundary for the header. Categories come from Payload; only the fixed
 * links (Studio, Contact) are defined in code.
 */
export async function Header() {
  const { items, cta, mobileItems } = await getNavigation()

  return <HeaderClient navItems={items} cta={cta} mobileItems={mobileItems} />
}
