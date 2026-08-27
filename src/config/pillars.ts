export type Pillar = {
  id: string
  index: string
  /** `\n` marks the intended line break in the display heading. */
  title: string
  description: string
  href: string
  image: {
    src: string
    alt: string
  }
}

export const pillars: Pillar[] = [
  {
    id: 'real-estate',
    index: '01',
    title: 'Luxury\nReal Estate',
    description:
      'Residences and retreats chosen for light, proportion and place. Homes that hold a feeling, long before they hold a price.',
    href: '/#contact',
    image: {
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=80',
      alt: 'Sunlit living room with warm timber and linen',
    },
  },
  {
    id: 'food',
    index: '02',
    title: 'Food',
    description:
      'Seasonal, honest and rooted in place — produce, provenance and the slow pleasure of a table well kept.',
    href: '/#contact',
    image: {
      src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=80',
      alt: 'A table set with seasonal produce',
    },
  },
  {
    id: 'fashion',
    index: '03',
    title: 'Fashion',
    description:
      'Quiet wardrobes built to last — natural fibres, considered cuts, and the kind of restraint that never dates.',
    href: '/#contact',
    image: {
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=80',
      alt: 'Neutral-toned garments on a rail',
    },
  },
]
