/**
 * JS-side mirror of the palette declared in `src/styles/tokens.css`.
 *
 * Only for values that cannot be expressed as a class — metadata `themeColor`,
 * canvas/SVG fills, inline `style` on a value Tailwind cannot know ahead of time.
 * For anything renderable, use the Tailwind utility instead of importing from here.
 *
 * Keep in sync with tokens.css.
 */

export const palette = {
  cream: '#F5F1EA',
  creamWarm: '#F8F5EF',
  creamDeep: '#EAE1D3',
  creamCard: '#EFE9DE',
  espresso: '#3A332C',
  espressoSoft: '#6B6258',
  ink: '#2E2822',
  clay: '#C08457',
  clayDeep: '#9C6239',
  olive: '#8A8B6C',
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1376,
} as const

export const easing = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

export type PaletteToken = keyof typeof palette
