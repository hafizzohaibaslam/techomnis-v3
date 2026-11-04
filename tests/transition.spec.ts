import { test, expect, type Page } from '@playwright/test'

test.setTimeout(60000)

test('page transition works when navigating', async ({ page }: { page: Page }) => {
  const viewportWidth = page.viewportSize()?.width || 1440

  await page.goto('http://localhost:3000/')
  await page.evaluate(() => sessionStorage.setItem('to-visited', 'true'))
  await page.reload()
  
  await page.waitForTimeout(2000)
  
  await page.screenshot({ path: 'test-results/01-before-nav.png' })
  
  let workLink
  if (viewportWidth < 1024) {
    const mobBtn = page.locator('#mobBtn')
    await expect(mobBtn).toBeVisible()
    await mobBtn.click()
    await page.waitForTimeout(500)
    workLink = page.locator('#mpanel a[href="/work"]')
  } else {
    workLink = page.locator('nav a[href="/work"]')
  }
  await expect(workLink).toBeVisible()
  await workLink.click()
  
  await page.waitForTimeout(100)
  await page.screenshot({ path: 'test-results/02-transition-100ms.png' })
  await page.waitForTimeout(200)
  await page.screenshot({ path: 'test-results/03-transition-300ms.png' })
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'test-results/04-transition-600ms.png' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'test-results/05-transition-1000ms.png' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'test-results/06-transition-1400ms.png' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'test-results/07-transition-1800ms.png' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/08-transition-2300ms.png' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/09-transition-2800ms.png' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/10-after-nav.png' })
  
  await expect(page).toHaveURL(/\/work/)
})
