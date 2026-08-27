/**
 * Photography studio page content. Moves to a Payload global alongside the rest
 * once the admin panel lands.
 */

export const studio = {
  title: 'Photography Studio',
  lead: 'A working photography studio in Thessaloniki — a 9 m seamless backdrop wall, studio strobes and floor enough to build a set properly. For stills, portraits, lookbooks and short film.',
  email: 'studio@noima.gr',
  address: ['Valaoritou 15', 'Thessaloniki 546 25'],
  transit: 'Venizelou metro, 4 min on foot',
  coordinates: { lat: 40.6382, lon: 22.9371 },
} as const

export const mapsUrl = `https://www.openstreetmap.org/?mlat=${studio.coordinates.lat}&mlon=${studio.coordinates.lon}#map=17/${studio.coordinates.lat}/${studio.coordinates.lon}`

export type Fact = { value: string; label: string }

export const facts: Fact[] = [
  { value: '180 m²', label: 'Shooting floor' },
  { value: '4.2 m', label: 'Ceiling height' },
  { value: '9 m', label: 'Backdrop wall' },
  { value: 'Thessaloniki', label: 'Location' },
]

export type Rate = {
  term: string
  price: string
  unit: string
  description: string
  /** Highlights the most-requested block. */
  featured?: boolean
}

export const rates: Rate[] = [
  {
    term: 'Hourly',
    price: '€80',
    unit: '/ hour',
    description: 'Minimum two hours. Ideal for portraits and small product sets.',
  },
  {
    term: 'Half day',
    price: '€280',
    unit: '/ 4 hours',
    description: 'Our most requested block. Includes set-up and strike time.',
    featured: true,
  },
  {
    term: 'Full day',
    price: '€600',
    unit: '/ 10 hours',
    description: 'Full access with kitchen and make-up corner for the crew.',
  },
]

export const included: string[] = [
  'Backdrop wall, 9 m',
  'Paper & vinyl backdrops',
  'Strobe kit & modifiers',
  'Continuous LED panels',
  'Blackout blinds',
  'C-stands, booms, sandbags',
  'Tethering station',
  'Hair & make-up corner',
  'Changing room',
  'Steamer & garment rail',
  'Kitchen & coffee',
  'Wi-Fi, sound, loading access',
]

export type Spec = { label: string; value: string }

export const specs: Spec[] = [
  { label: 'Hours', value: 'Mon–Sat, 08:00–21:00' },
  { label: 'Capacity', value: 'Up to 25 people' },
  { label: 'Overtime', value: '€90 per hour' },
  { label: 'Deposit', value: '30% to confirm' },
  { label: 'Digital operator', value: 'On request' },
  { label: 'Extra lighting', value: 'Rental on request' },
]

export type Term = { heading: string; body: string }

export const terms: Term[] = [
  {
    heading: 'Booking & deposit',
    body: 'A booking is confirmed once a 30% deposit is received. The balance is due on the shoot day, before the session begins.',
  },
  {
    heading: 'Cancellation',
    body: 'Cancel more than 72 hours before your slot for a full refund of the deposit. Inside 72 hours the deposit is retained, and may be moved once to another date within three months.',
  },
  {
    heading: 'Hours & overtime',
    body: 'Booked hours include set-up and strike. Overtime is billed at €90 per hour, in half-hour increments, subject to availability.',
  },
  {
    heading: 'The space',
    body: 'Please leave the studio as you found it. Backdrop wall repainting is charged at cost if scuffed, and seamless paper is billed per metre used. No adhesives, nails or paint on walls or floors without written agreement.',
  },
  {
    heading: 'Equipment',
    body: 'Included lighting is for use inside the studio only. Damage or loss of modifiers, heads and stands is billed at replacement cost. Please report faults before the session starts.',
  },
  {
    heading: 'Damage & insurance',
    body: 'The hirer is responsible for damage to the space and equipment caused by their crew. Productions of more than ten people must carry public liability insurance.',
  },
  {
    heading: 'House rules',
    body: 'No smoking indoors. Music at considerate levels after 20:00. Animals and open flame by prior arrangement only.',
  },
  {
    heading: 'Liability',
    body: 'NOIMA is not liable for loss or damage to personal property left on site, nor for delays caused by circumstances beyond our control.',
  },
]

export type Shot = { src: string; alt: string }

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/** First entry is the wide lead image; the rest fill the row beneath it. */
export const shots: Shot[] = [
  { src: unsplash('1554941829-202a0b2403b8', 1800), alt: 'A set built on the backdrop wall' },
  {
    src: unsplash('1567016432779-094069958ea5', 1200),
    alt: 'Furniture set on a coloured backdrop',
  },
  { src: unsplash('1626947346165-4c2288dadc2a', 1200), alt: 'Product shot on seamless white' },
  {
    src: unsplash('1516035069371-29a1b244cc32', 1200),
    alt: 'Camera bodies and lenses on the bench',
  },
]
