import { test, type Page } from '@playwright/test'

test('screenshot footer emoji', async ({ page }: { page: Page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/')
  await page.evaluate(() => sessionStorage.setItem('to-visited', 'true'))
  await page.reload()
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  await page.screenshot({ path: 'test-results/footer-emoji-check.png', fullPage: false })
})
