import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import { facts, rates, shots, studio } from '@/config/studio'

import { getMediaUrl } from './getMediaUrl'
import { getServerSideURL } from './getURL'

type Image = { url: string; width: number; height: number; alt: string }

export const absoluteUrl = (path: string): string => new URL(path, getServerSideURL()).toString()

/** Shortens at a word boundary, marking the cut with an ellipsis. */
export const truncate = (text: string, max: number): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean

  // One character is kept back for the ellipsis. If the cut lands exactly on a
  // word's end the word stays; otherwise the partial word is dropped.
  const cut = clean.slice(0, max - 1)
  const endsOnWord = clean[max - 1] === ' '
  const lastSpace = cut.lastIndexOf(' ')
  const kept = endsOnWord || lastSpace <= 0 ? cut : cut.slice(0, lastSpace)

  return `${kept.replace(/[\s,.;:—–-]+$/, '')}…`
}

/** The Greek search phrase for a category, or the city when none is set. */
export const greekFor = (categorySlug: string | null | undefined): string =>
  (categorySlug && seoConfig.categoryGreek[categorySlug]) || seoConfig.fallbackGreek

/**
 * English copy followed by its Greek phrase. The English side gives way when
 * space runs out — the Greek is the part that has nowhere else to appear.
 */
export const composeDescription = (english: string, greek: string): string => {
  const tail = ` ${greek}.`
  const room = seoConfig.descriptionLength - tail.length

  return `${truncate(english, room)}${tail}`
}

/** A share image from Payload media, preferring the 1200x630 `og` rendition. */
export const mediaImage = (
  media: Media | number | string | null | undefined,
  alt: string,
): Image | undefined => {
  if (!media || typeof media !== 'object' || !media.url) return undefined

  const og = media.sizes?.og
  const source = og?.url ? og : media

  return {
    url: absoluteUrl(getMediaUrl(source.url)),
    width: source.width ?? seoConfig.defaultImage.width,
    height: source.height ?? seoConfig.defaultImage.height,
    alt: media.alt || alt,
  }
}

/**
 * One page's metadata: title, description, canonical, Open Graph and the
 * Twitter card, so no page can set one and forget the others.
 *
 * `path` is relative — the root layout's `metadataBase` makes it absolute.
 * `absoluteTitle` opts out of the layout's "— NOIMA" template.
 */
export const buildMetadata = ({
  title,
  absoluteTitle = false,
  description,
  path,
  image,
}: {
  title: string
  absoluteTitle?: boolean
  description: string
  path: string
  image?: Image
}): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} — ${siteConfig.name}`
  const images = [image ?? seoConfig.defaultImage]

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
  }
}

// ---------- Structured data (schema.org JSON-LD) ----------

const organizationId = () => absoluteUrl('/#organization')

/** Digits and a leading +, the form schema.org and `tel:` links expect. */
const telephone = siteConfig.phone.replace(/[^\d+]/g, '')

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId(),
  name: siteConfig.name,
  alternateName: seoConfig.nameGreek,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/logo.png'),
  description: seoConfig.home.description,
  email: siteConfig.email,
  telephone,
  sameAs: [siteConfig.instagram],
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.city,
    addressCountry: 'GR',
  },
})

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  alternateName: seoConfig.nameGreek,
  url: absoluteUrl('/'),
  inLanguage: 'en',
  publisher: { '@id': organizationId() },
})

/** Pulls the number out of a display price such as "€280". */
const amount = (price: string): number => Number(price.replace(/[^\d.]/g, ''))

export const studioJsonLd = () => {
  const { postalAddress, coordinates, openingHours } = studio
  const prices = rates.map((rate) => amount(rate.price))

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl('/studio#business'),
    name: `${siteConfig.name} ${studio.title}`,
    alternateName: seoConfig.studio.nameGreek,
    description: studio.lead,
    url: absoluteUrl('/studio'),
    image: shots.map((shot) => shot.src),
    email: studio.email,
    telephone,
    priceRange: `€${Math.min(...prices)}–€${Math.max(...prices)}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: postalAddress.street,
      postalCode: postalAddress.postalCode,
      addressLocality: postalAddress.locality,
      addressCountry: postalAddress.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lon,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: openingHours.days.map((day) => `https://schema.org/${day}`),
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    makesOffer: rates.map((rate) => ({
      '@type': 'Offer',
      name: `Studio rental — ${rate.term}`,
      description: rate.description,
      price: amount(rate.price),
      priceCurrency: 'EUR',
    })),
    amenityFeature: facts.map((fact) => ({
      '@type': 'LocationFeatureSpecification',
      name: fact.label,
      value: fact.value,
    })),
    parentOrganization: { '@id': organizationId() },
  }
}

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const imageGalleryJsonLd = ({
  name,
  description,
  path,
  images,
}: {
  name: string
  description: string
  path: string
  images: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name,
  description,
  url: absoluteUrl(path),
  image: images.slice(0, 10),
  publisher: { '@id': organizationId() },
})

/**
 * JSON for a `<script type="application/ld+json">`. `<` is escaped so text from
 * the CMS cannot close the tag early (per the Next.js JSON-LD guide).
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c')
