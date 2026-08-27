export type NavLink = {
  label: string
  href: string
}

export type NavItem = NavLink & {
  /** Renders a hover panel of sub-collections under the item. */
  collections?: NavLink[]
}

export const headerNav: NavItem[] = [
  {
    label: 'Luxury Real Estate',
    href: '/#real-estate',
    collections: [
      { label: 'Aesthetic House', href: '/collections/aesthetic-house' },
      { label: 'Aristocracy', href: '/collections/aristocracy' },
      { label: 'Oro Modern Living', href: '/collections/oro-modern-living' },
      { label: 'Suite', href: '/collections/suite' },
      { label: 'Apartment Nefeli', href: '/collections/apartment-nefeli' },
      { label: 'Home Details', href: '/collections/home-details' },
    ],
  },
  {
    label: 'Food',
    href: '/#food',
    collections: [
      { label: 'Table & Provisions', href: '/collections/table-and-provisions' },
      { label: 'Seasonal Produce', href: '/collections/seasonal-produce' },
      { label: 'The Cellar', href: '/collections/the-cellar' },
      { label: 'Kitchen Notes', href: '/collections/kitchen-notes' },
    ],
  },
  {
    label: 'Fashion',
    href: '/#fashion',
    collections: [
      { label: 'Atelier', href: '/collections/atelier' },
      { label: 'Knitwear', href: '/collections/knitwear' },
      { label: 'Accessories', href: '/collections/accessories' },
      { label: 'The Archive', href: '/collections/the-archive' },
    ],
  },
  { label: 'Studio', href: '/studio' },
]

/** The CTA pinned to the right of the desktop nav. */
export const headerCta: NavLink = { label: 'Contact', href: '/#contact' }

/** Flattened for the mobile drawer — sub-collections are reachable from the section pages. */
export const mobileNav: NavLink[] = [
  { label: 'Real Estate', href: '/#real-estate' },
  { label: 'Food', href: '/#food' },
  { label: 'Fashion', href: '/#fashion' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/#contact' },
]

export const footerNav: NavLink[] = [
  { label: 'Real Estate', href: '/#real-estate' },
  { label: 'Food', href: '/#food' },
  { label: 'Fashion', href: '/#fashion' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/#contact' },
]
