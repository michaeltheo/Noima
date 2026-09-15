/**
 * Search wording. The site itself is English; Greek appears only here, blended
 * into titles, descriptions and structured data so Greek searches can match.
 *
 * Category phrases are keyed by slug. A category missing from the map falls
 * back to `fallbackGreek` until a phrase is added.
 */
export const seoConfig = {
  /** Canonical origin. `NEXT_PUBLIC_SERVER_URL` overrides it; see `getServerSideURL`. */
  siteUrl: 'https://noima-jt.gr',
  nameGreek: 'Νόημα',

  /** Google shows roughly this many characters of a description. */
  descriptionLength: 160,

  home: {
    title: 'NOIMA · Νόημα — Real Estate, Food & Fashion in Thessaloniki',
    // With the Greek phrase appended this has to stay under ~95 characters.
    description:
      'A curated lifestyle house in Thessaloniki — real estate, food, fashion and a photography studio.',
    greek: 'Ακίνητα, γεύση, μόδα & φωτογραφικό στούντιο στη Θεσσαλονίκη',
  },

  studio: {
    title: 'Photography Studio Thessaloniki · Φωτογραφικό Στούντιο',
    greek: 'Ενοικίαση φωτογραφικού στούντιο Θεσσαλονίκη',
    nameGreek: 'Φωτογραφικό Στούντιο NOIMA',
  },

  categoryGreek: {
    'luxury-real-estate': 'Πολυτελή Ακίνητα Θεσσαλονίκη',
    food: 'Γεύση & Γαστρονομία Θεσσαλονίκη',
    fashion: 'Μόδα Θεσσαλονίκη',
  } as Record<string, string>,
  fallbackGreek: 'Θεσσαλονίκη',

  /** Share card for pages without a photo of their own. */
  defaultImage: {
    url: '/og-default.png',
    width: 1200,
    height: 630,
    alt: 'NOIMA — Real Estate, Food, Fashion & Photography Studio in Thessaloniki',
  },
} as const
