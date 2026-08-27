/**
 * Navigation entries that are NOT categories.
 *
 * Every category and its collections come from Payload — see
 * `src/data/navigation.ts`. Only these fixed links live in code.
 */

export type NavLink = {
  label: string
  href: string
}

export type NavItem = NavLink & {
  /** Renders a hover panel of collections under the item. */
  collections?: NavLink[]
}

/** Appended after the categories, in both the desktop and mobile menus. */
export const staticNavItems: NavLink[] = [{ label: 'Studio', href: '/studio' }]

/** The CTA pinned to the right of the desktop nav. */
export const headerCta: NavLink = { label: 'Contact', href: '/#contact' }

/** Appended after the categories in the footer. */
export const staticFooterLinks: NavLink[] = [
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/#contact' },
]
