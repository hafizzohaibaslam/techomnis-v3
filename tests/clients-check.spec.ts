import { test, type Page } from '@playwright/test'

test('screenshot clients section', async ({ page }: { page: Page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/')
  await page.evaluate(() => sessionStorage.setItem('to-visited', 'true'))
  await page.reload()
  await page.waitForTimeout(2000)
  
  const clientsSection = page.locator('#clients')
  await clientsSection.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: 'test-results/clients-section-1.png', fullPage: false })
  
  await page.evaluate(() => window.scrollBy(0, 600))
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/clients-section-2.png', fullPage: false })
})
