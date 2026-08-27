import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/NOIMA/)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('A quiet sense of')
  })

  test('renders the three pillars', async ({ page }) => {
    await page.goto('http://localhost:3000')
    for (const id of ['real-estate', 'food', 'fashion']) {
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
  })
})
