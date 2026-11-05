import { test, expect, type Page } from '@playwright/test'

test.setTimeout(120000)

test('animations replay when revisiting pages', async ({ page }: { page: Page }) => {
  const viewportWidth = page.viewportSize()?.width || 1440

  await page.goto('http://localhost:3000/')
  await page.evaluate(() => sessionStorage.setItem('to-visited', 'true'))
  await page.reload()
  
  await page.waitForTimeout(2000)
  
  await page.screenshot({ path: 'test-results/replay-01-home-first.png' })
  
  let servicesLink
  if (viewportWidth < 1024) {
    const mobBtn = page.locator('#mobBtn')
    await expect(mobBtn).toBeVisible()
    await mobBtn.click()
    await page.waitForTimeout(500)
    servicesLink = page.locator('#mpanel a[href="/services"]')
  } else {
    servicesLink = page.locator('nav a[href="/services"]')
  }
  await expect(servicesLink).toBeVisible()
  await servicesLink.click()
  
  await page.waitForTimeout(3500)
  await expect(page).toHaveURL(/\/services/)
  await page.screenshot({ path: 'test-results/replay-02-services-first.png' })
  
  let processLink
  if (viewportWidth < 1024) {
    const mobBtn = page.locator('#mobBtn')
    await expect(mobBtn).toBeVisible()
    await mobBtn.click()
    await page.waitForTimeout(500)
    processLink = page.locator('#mpanel a[href="/process"]')
  } else {
    processLink = page.locator('nav a[href="/process"]')
  }
  await expect(processLink).toBeVisible()
  await processLink.click()
  
  await page.waitForTimeout(3500)
  await expect(page).toHaveURL(/\/process/)
  await page.screenshot({ path: 'test-results/replay-03-process.png' })
  
  let servicesLink2
  if (viewportWidth < 1024) {
    const mobBtn = page.locator('#mobBtn')
    await expect(mobBtn).toBeVisible()
    await mobBtn.click()
    await page.waitForTimeout(500)
    servicesLink2 = page.locator('#mpanel a[href="/services"]')
  } else {
    servicesLink2 = page.locator('nav a[href="/services"]')
  }
  await expect(servicesLink2).toBeVisible()
  await servicesLink2.click()
  
  await page.waitForTimeout(3500)
  await expect(page).toHaveURL(/\/services/)
  await page.screenshot({ path: 'test-results/replay-04-services-second.png' })
  
  await page.goBack()
  await page.waitForTimeout(3500)
  await page.screenshot({ path: 'test-results/replay-05-back-to-process.png' })
  
  await page.goForward()
  await page.waitForTimeout(3500)
  await page.screenshot({ path: 'test-results/replay-06-forward-to-services.png' })
})
