/**
 * Static site details. These move to a Payload global once the admin panel lands;
 * keeping them in one place now makes that swap a one-file change.
 */
export const siteConfig = {
  name: 'NOIMA',
  tagline: 'Real Estate · Food · Fashion',
  description:
    'NOIMA is a curated lifestyle house — places to live, things to taste, ways to dress. One philosophy, three expressions of considered living.',
  locale: 'en',
  city: 'Thessaloniki',
  email: 'hello@noima.gr',
  phone: '+30 2310 000 000',
  instagram: 'https://instagram.com/',
  credit: {
    label: 'mtwebstudio',
    href: 'https://www.mtwebstudio.gr/',
  },
} as const

/**
 * Hero backdrop. `video` is optional — when it is null the poster image carries
 * the section on its own, so nothing 404s before the real footage is uploaded.
 */
export const heroMedia = {
  video: null as string | null,
  poster:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1900&q=80',
  alt: 'Sunlit interior of a NOIMA residence',
} as const
