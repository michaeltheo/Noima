import type { Media } from '@/payload-types'

import { seoConfig } from '@/config/seo'
import { getServerSideURL } from '@/utilities/getURL'
import {
  breadcrumbJsonLd,
  buildMetadata,
  composeDescription,
  greekFor,
  imageGalleryJsonLd,
  mediaImage,
  serializeJsonLd,
  studioJsonLd,
  truncate,
} from '@/utilities/seo'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://noima-jt.gr')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getServerSideURL', () => {
  it('uses the configured origin without a trailing slash', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://noima-jt.gr/')
    expect(getServerSideURL()).toBe('https://noima-jt.gr')
  })

  it('never hands a production build a localhost origin', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'http://localhost:3000')
    expect(getServerSideURL()).toBe(seoConfig.siteUrl)
  })

  it('keeps localhost for local development', () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', '')
    expect(getServerSideURL()).toBe('http://localhost:3000')
  })
})

describe('truncate', () => {
  it('leaves short text alone', () => {
    expect(truncate('Short text.', 50)).toBe('Short text.')
  })

  it('cuts at a word boundary and marks the cut', () => {
    const result = truncate('A curated lifestyle house in Thessaloniki', 20)
    expect(result).toBe('A curated lifestyle…')
    expect(result.length).toBeLessThanOrEqual(20)
  })
})

describe('greekFor', () => {
  it('returns the phrase for a known category', () => {
    expect(greekFor('luxury-real-estate')).toBe('Πολυτελή Ακίνητα Θεσσαλονίκη')
  })

  it('falls back for a category without a phrase', () => {
    expect(greekFor('ceramics')).toBe(seoConfig.fallbackGreek)
    expect(greekFor(null)).toBe(seoConfig.fallbackGreek)
  })
})

describe('composeDescription', () => {
  it('joins English and Greek', () => {
    expect(composeDescription('Homes with a point of view.', 'Πολυτελή Ακίνητα')).toBe(
      'Homes with a point of view. Πολυτελή Ακίνητα.',
    )
  })

  it('keeps the Greek intact and the whole within the limit', () => {
    const english = 'word '.repeat(60).trim()
    const result = composeDescription(english, 'Μόδα Θεσσαλονίκη')
    expect(result.length).toBeLessThanOrEqual(seoConfig.descriptionLength)
    expect(result.endsWith('Μόδα Θεσσαλονίκη.')).toBe(true)
  })
})

describe('mediaImage', () => {
  const media = {
    id: 1,
    alt: '',
    url: '/api/media/file/cover.jpg',
    width: 3000,
    height: 2000,
    sizes: { og: { url: '/api/media/file/cover-1200x630.jpg', width: 1200, height: 630 } },
  } as unknown as Media

  it('prefers the 1200x630 rendition, as an absolute /media URL', () => {
    expect(mediaImage(media, 'Aristocracy')).toEqual({
      url: 'https://noima-jt.gr/media/cover-1200x630.jpg',
      width: 1200,
      height: 630,
      alt: 'Aristocracy',
    })
  })

  it('falls back to the original when no og rendition exists', () => {
    const image = mediaImage({ ...media, sizes: {} }, 'Aristocracy')
    expect(image?.url).toBe('https://noima-jt.gr/media/cover.jpg')
  })

  it('returns undefined for missing or unpopulated media', () => {
    expect(mediaImage(null, 'x')).toBeUndefined()
    expect(mediaImage(7, 'x')).toBeUndefined()
  })
})

describe('buildMetadata', () => {
  it('builds a canonical, Open Graph and Twitter card from one input', () => {
    const metadata = buildMetadata({
      title: 'Aristocracy · Πολυτελή Ακίνητα Θεσσαλονίκη',
      description: 'An album.',
      path: '/luxury-real-estate/aristocracy',
    })

    expect(metadata.title).toBe('Aristocracy · Πολυτελή Ακίνητα Θεσσαλονίκη')
    expect(metadata.alternates?.canonical).toBe('/luxury-real-estate/aristocracy')
    expect(metadata.openGraph).toMatchObject({
      siteName: 'NOIMA',
      title: 'Aristocracy · Πολυτελή Ακίνητα Θεσσαλονίκη — NOIMA',
      url: '/luxury-real-estate/aristocracy',
      images: [expect.objectContaining({ url: seoConfig.defaultImage.url })],
    })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
  })

  it('keeps an absolute title free of the template suffix', () => {
    const metadata = buildMetadata({
      title: seoConfig.home.title,
      absoluteTitle: true,
      description: 'd',
      path: '/',
    })

    expect(metadata.title).toEqual({ absolute: seoConfig.home.title })
    expect(metadata.openGraph?.title).toBe(seoConfig.home.title)
  })
})

describe('structured data', () => {
  it('describes the studio as a local business with address and hours', () => {
    const data = studioJsonLd()

    expect(data['@type']).toBe('LocalBusiness')
    expect(data.address).toMatchObject({
      streetAddress: 'Valaoritou 15',
      postalCode: '546 25',
      addressLocality: 'Thessaloniki',
      addressCountry: 'GR',
    })
    expect(data.openingHoursSpecification).toMatchObject({ opens: '08:00', closes: '21:00' })
    expect(data.telephone).toBe('+306986652141')
    expect(data.makesOffer).toContainEqual(
      expect.objectContaining({ price: 80, priceCurrency: 'EUR' }),
    )
  })

  it('numbers breadcrumb positions and makes URLs absolute', () => {
    const data = breadcrumbJsonLd([
      { name: 'NOIMA', path: '/' },
      { name: 'Luxury Real Estate', path: '/luxury-real-estate' },
    ])

    expect(data.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Luxury Real Estate',
      item: 'https://noima-jt.gr/luxury-real-estate',
    })
  })

  it('caps a gallery at ten images', () => {
    const images = Array.from({ length: 14 }, (_, i) => `https://noima-jt.gr/media/${i}.jpg`)
    const data = imageGalleryJsonLd({ name: 'A', description: 'B', path: '/a/b', images })
    expect(data.image).toHaveLength(10)
  })

  it('escapes < so a stored string cannot close the script tag', () => {
    const output = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
    expect(output).not.toContain('<')
    expect(JSON.parse(output).name).toBe('</script><script>alert(1)</script>')
  })
})
