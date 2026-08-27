/**
 * Builds the two header/footer colourways from the master artwork.
 *
 *   public/logo.png  ->  public/brand/noima-espresso.png  (dark type, light UI)
 *                    ->  public/brand/noima-cream.png     (light type, dark UI)
 *
 * The master ships white letters with a hairline dark keyline and a pale clay
 * ring. White type disappears on the cream header and the pale ring washes out
 * against it, so each variant remaps the two ink families to palette tokens
 * instead of relying on a CSS filter (a filter cannot recolour the two families
 * independently). Run with `pnpm logo:variants` after replacing logo.png.
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SOURCE = 'public/logo.png'
const OUT_DIR = 'public/brand'

/** Palette tokens, mirrored from src/styles/tokens.css. */
const CREAM = [0xf5, 0xf1, 0xea]
const ESPRESSO = [0x3a, 0x33, 0x2c]
const CLAY = [0xc0, 0x84, 0x57]

const VARIANTS = [
  // On cream, the master's pale ring has almost no contrast, so the ring takes
  // the site's clay accent and the type takes espresso.
  { name: 'noima-espresso.png', type: ESPRESSO, ring: CLAY },
  // On espresso the master's own colours already read, so only the type is
  // nudged off pure white onto cream.
  { name: 'noima-cream.png', type: CREAM, ring: null },
]

/** Clay pixels are warm (red clearly above blue); type and keyline are neutral. */
const isRing = (r, _g, b) => r - b > 24

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

await mkdir(OUT_DIR, { recursive: true })

for (const variant of VARIANTS) {
  const out = Buffer.from(data)

  for (let i = 0; i < out.length; i += channels) {
    if (out[i + 3] === 0) continue
    const target = isRing(out[i], out[i + 1], out[i + 2]) ? variant.ring : variant.type
    if (!target) continue
    // Flat fill: the keyline only existed to separate white type from a white
    // page, and a solid mark stays crisp down to the 22px footer size.
    ;[out[i], out[i + 1], out[i + 2]] = target
  }

  const file = `${OUT_DIR}/${variant.name}`
  await sharp(out, { raw: { width, height, channels } }).png({ compressionLevel: 9 }).toFile(file)
  console.log(`${file} ${width}x${height}`)
}
