import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/NOIMA/)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('A quiet sense of')
  })

  // Pillars are driven by whichever categories are flagged featuredOnHome, so
  // assert the shape of the section rather than specific slugs or a count.
  // Pillars renders nothing at all when none are flagged — the normal state of
  // CI's empty database — so skip loudly there instead of passing vacuously.
  test('renders the pillars section with anchored cards', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const pillars = page.locator('#pillars')
    test.skip(
      (await pillars.count()) === 0,
      'No categories flagged featuredOnHome — nothing for this test to check.',
    )

    const cards = pillars.locator('article')
    await expect(cards.first()).toBeVisible()

    // Every card needs its slug anchor — the header nav scrolls to these.
    for (const card of await cards.all()) {
      await expect(card).toBeVisible()
      await expect(card).toHaveAttribute('id', /\S/)
    }
  })
})
