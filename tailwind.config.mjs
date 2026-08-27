/**
 * Only the `@tailwindcss/typography` overrides live here — every design token is
 * declared in `src/styles/tokens.css` via `@theme`.
 *
 * @type {import('tailwindcss').Config}
 */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--color-espresso)',
              '--tw-prose-headings': 'var(--color-ink)',
              '--tw-prose-links': 'var(--color-clay-deep)',
              '--tw-prose-bold': 'var(--color-ink)',
              '--tw-prose-quotes': 'var(--color-espresso-soft)',
              '--tw-prose-quote-borders': 'var(--color-clay)',
              '--tw-prose-bullets': 'var(--color-clay)',
              '--tw-prose-hr': 'var(--color-line)',
              fontFamily: 'var(--font-body)',
              h1: {
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
              },
              h3: {
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: { fontSize: '2.5rem' },
              h2: { fontSize: '1.5rem' },
            },
          ],
        },
        md: {
          css: [
            {
              h1: { fontSize: '3.5rem' },
              h2: { fontSize: '1.75rem' },
            },
          ],
        },
      },
    },
  },
}

export default config
