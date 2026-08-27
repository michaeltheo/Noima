import type { NavItem, NavLink } from '@/config/navigation'

import { headerCta, staticFooterLinks, staticNavItems } from '@/config/navigation'

import { getCategories } from './categories'

export type Navigation = {
  items: NavItem[]
  cta: NavLink
  mobileItems: NavLink[]
  footerItems: NavLink[]
}

/**
 * Builds every menu from the categories in Payload, with the fixed links
 * appended. An empty CMS yields just the fixed links rather than an error.
 */
export const getNavigation = async (): Promise<Navigation> => {
  const categories = await getCategories()
  const inNav = categories.filter((category) => category.showInNav)

  const categoryLinks: NavLink[] = inNav.map((category) => ({
    label: category.title,
    href: `/${category.slug}`,
  }))

  const items: NavItem[] = inNav.map((category) => ({
    label: category.title,
    href: `/${category.slug}`,
    collections: category.collections.length
      ? category.collections.map((collection) => ({
          label: collection.title,
          href: `/${category.slug}/${collection.slug}`,
        }))
      : undefined,
  }))

  return {
    items: [...items, ...staticNavItems],
    cta: headerCta,
    // The drawer is flat — collections are reachable from the category page.
    mobileItems: [...categoryLinks, ...staticNavItems, headerCta],
    footerItems: [...categoryLinks, ...staticFooterLinks],
  }
}
