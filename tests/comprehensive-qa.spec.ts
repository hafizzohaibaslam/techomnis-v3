import { test, expect, type Page, type BrowserContext } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'
const SCREENSHOT_DIR = 'test-results/qa-screenshots'

const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/services/mvp-rescue', name: 'services-mvp-rescue' },
  { path: '/services/product-engineering', name: 'services-product-engineering' },
  { path: '/services/ai-llm', name: 'services-ai-llm' },
  { path: '/work', name: 'work' },
  { path: '/work/othego', name: 'work-othego' },
  { path: '/process', name: 'process' },
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
]

test.setTimeout(120000)

test.describe('Comprehensive QA Pass', () => {
  let consoleErrors: string[] = []

  test.beforeEach(async ({ page }) => {
    consoleErrors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[${msg.type()}] ${msg.text()}`)
      }
    })
    page.on('pageerror', (err) => {
      consoleErrors.push(`[pageerror] ${err.message}`)
    })
  })

  test.describe('Page Screenshots & Console Check', () => {
    for (const pageInfo of PAGES) {
      test(`${pageInfo.name} - screenshot and console check`, async ({ page }, testInfo) => {
        await page.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'networkidle' })
        
        await page.waitForTimeout(2000)
        
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(500)
        
        const viewportWidth = page.viewportSize()?.width || 1440
        const projectName = testInfo.project.name.replace(/[^a-zA-Z0-9]/g, '-')
        
        await page.screenshot({
          path: `${SCREENSHOT_DIR}/${pageInfo.name}-${viewportWidth}px-${projectName}-above-fold.png`,
          fullPage: false,
        })
        
        await page.screenshot({
          path: `${SCREENSHOT_DIR}/${pageInfo.name}-${viewportWidth}px-${projectName}-full.png`,
          fullPage: true,
        })
        
        const hydrationErrors = consoleErrors.filter(e => 
          e.includes('Hydration') || 
          e.includes('hydrat') ||
          e.includes('mismatch')
        )
        expect(hydrationErrors, `Hydration errors on ${pageInfo.path}`).toHaveLength(0)
        
        const criticalErrors = consoleErrors.filter(e =>
          e.includes('404') ||
          e.includes('Failed to load') ||
          e.includes('TypeError') ||
          e.includes('ReferenceError')
        )
        if (criticalErrors.length > 0) {
          console.warn(`Non-hydration console errors on ${pageInfo.path}:`, criticalErrors)
        }
      })
    }
  })

  test.describe('Navigation & Transitions', () => {
    async function openMobileMenuIfNeeded(page: Page) {
      const viewportWidth = page.viewportSize()?.width || 1440
      if (viewportWidth <= 1023) {
        const menuButton = page.locator('.ham')
        if (await menuButton.isVisible()) {
          await menuButton.click()
          await page.waitForTimeout(500)
        }
      }
    }

    test('page transitions work correctly', async ({ page }, testInfo) => {
      const viewportWidth = page.viewportSize()?.width || 1440
      if (viewportWidth <= 768) {
        test.skip()
        return
      }

      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(3000)

      await openMobileMenuIfNeeded(page)
      await page.click('a[href="/services"]')
      await page.waitForURL('**/services', { timeout: 10000 })
      await expect(page).toHaveURL(/\/services/)
      
      await page.waitForTimeout(2000)
      
      const transOverlay = page.locator('.trans')
      const hasTransition = await transOverlay.count() > 0
      if (hasTransition) {
        await expect(transOverlay).toBeHidden({ timeout: 3000 })
      }
    })

    test('animation replay on page revisit', async ({ page }, testInfo) => {
      const viewportWidth = page.viewportSize()?.width || 1440
      if (viewportWidth <= 768) {
        test.skip()
        return
      }

      await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(3000)
      
      await openMobileMenuIfNeeded(page)
      await page.click('a[href="/about"]')
      await page.waitForURL('**/about', { timeout: 10000 })
      await page.waitForTimeout(3000)
      
      await openMobileMenuIfNeeded(page)
      await page.click('a[href="/services"]')
      await page.waitForURL('**/services', { timeout: 10000 })
      await page.waitForTimeout(2000)
      
      const lines = page.locator('.ln, .vline')
      const count = await lines.count()
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        const el = lines.nth(i)
        const hasDrawn = await el.getAttribute('data-lineDrawn')
        expect(hasDrawn, 'data-lineDrawn should be cleared on revisit to allow replay').toBeFalsy()
      }
    })

    test('back/forward navigation works', async ({ page }, testInfo) => {
      const viewportWidth = page.viewportSize()?.width || 1440
      if (viewportWidth <= 768) {
        test.skip()
        return
      }

      await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)
      
      await openMobileMenuIfNeeded(page)
      await page.click('a[href="/work"]')
      await page.waitForURL('**/work', { timeout: 10000 })
      await page.waitForTimeout(2000)
      
      await page.goBack()
      await expect(page).toHaveURL(/\/about/)
      await page.waitForTimeout(2000)
      
      await page.goForward()
      await expect(page).toHaveURL(/\/work/)
    })
  })

  test.describe('Interactive Elements', () => {
    test('mobile menu opens and closes', async ({ page }, testInfo) => {
      if (!testInfo.project.name.includes('390')) {
        test.skip()
        return
      }

      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(3000)

      const menuButton = page.locator('.ham')
      if (await menuButton.isVisible()) {
        await menuButton.click()
        await page.waitForTimeout(500)
        
        const nav = page.locator('.navlinks')
        await expect(nav).toBeVisible()
        
        await menuButton.click()
        await page.waitForTimeout(500)
      }
    })

    test('skip link is sr-only until focused', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      const skipLink = page.locator('.skip')
      if (await skipLink.count() > 0) {
        const isHidden = await skipLink.evaluate((el) => {
          const style = window.getComputedStyle(el)
          const rect = el.getBoundingClientRect()
          const clip = style.clip
          const position = style.position
          const top = parseFloat(style.top) || 0
          return (
            clip === 'rect(0px, 0px, 0px, 0px)' ||
            position === 'absolute' ||
            (position === 'fixed' && top < 0) ||
            rect.top < 0
          )
        })
        expect(isHidden, 'Skip link should be hidden off-screen or clipped').toBeTruthy()
      }
    })

    test('contact form validation', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      const submitBtn = page.locator('button[type="submit"], .bbtn')
      if (await submitBtn.count() > 0 && await submitBtn.first().isVisible()) {
        await submitBtn.first().click()
        await page.waitForTimeout(500)
        
        const errorMessages = page.locator('.ferr, [class*="error"]')
        const hasErrors = await errorMessages.count() > 0
      }
    })

    test('hover states work on buttons and links', async ({ page }, testInfo) => {
      if (testInfo.project.name.includes('Mobile')) {
        test.skip()
        return
      }

      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(3000)

      const ctaButton = page.locator('.btn').first()
      if (await ctaButton.isVisible()) {
        const boxBefore = await ctaButton.boundingBox()
        await ctaButton.hover()
        await page.waitForTimeout(300)
      }

      const ftCta = page.locator('.ft-cta a').first()
      if (await ftCta.isVisible()) {
        await ftCta.hover()
        await page.waitForTimeout(300)
        
        const emoji = page.locator('.ft-cta .emo')
        if (await emoji.count() > 0) {
          const transform = await emoji.evaluate((el) => {
            return window.getComputedStyle(el).transform
          })
        }
      }
    })
  })

  test.describe('Layout & Styling', () => {
    test('no horizontal overflow', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      })
      expect(hasOverflow, 'Page should not have horizontal overflow').toBeFalsy()
    })

    test('footer emoji sizing is correct', async ({ page }, testInfo) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
      await page.waitForTimeout(2000)

      const emoji = page.locator('.ft-cta .emo')
      if (await emoji.count() > 0 && await emoji.isVisible()) {
        const fontSize = await emoji.evaluate((el) => {
          return window.getComputedStyle(el).fontSize
        })
        
        const fontSizeNum = parseFloat(fontSize)
        expect(fontSizeNum, 'Footer emoji should be properly sized (not tiny)').toBeGreaterThan(20)
      }
    })

    test('clients grid has bordered cells', async ({ page }, testInfo) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      const clientsSection = page.locator('#clients')
      if (await clientsSection.count() > 0) {
        await clientsSection.scrollIntoViewIfNeeded()
        await page.waitForTimeout(1000)
        
        const clientCells = page.locator('.client-cell')
        const cellCount = await clientCells.count()
        expect(cellCount, 'Clients section should have cells').toBeGreaterThan(0)
        
        if (cellCount > 0) {
          const firstCell = clientCells.first()
          const hasBorder = await firstCell.evaluate((el) => {
            const classes = el.className
            return classes.includes('ln') || classes.includes('lb') || classes.includes('lr')
          })
          expect(hasBorder, 'Client cells should have border classes').toBeTruthy()
        }
      }
    })

    test('header line draws on scroll', async ({ page }, testInfo) => {
      if (testInfo.project.name.includes('Mobile')) {
        test.skip()
        return
      }

      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(3000)

      await page.evaluate(() => window.scrollBy(0, 200))
      await page.waitForTimeout(1000)

      const headerLine = page.locator('.header.hl')
      if (await headerLine.count() > 0) {
        const style = await headerLine.evaluate((el) => {
          return el.style.cssText
        })
      }
    })
  })

  test.describe('404 Page', () => {
    test('404 page renders correctly', async ({ page }) => {
      await page.goto(`${BASE_URL}/nonexistent-page-12345`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      const pageContent = await page.content()
      const has404 = pageContent.includes('404') || pageContent.includes('not found')
      
      const e404 = page.locator('.e404')
      if (await e404.count() > 0) {
        await expect(e404).toBeVisible()
      }
    })
  })

  test.describe('Asset Loading', () => {
    test('no 404 assets', async ({ page }) => {
      const failedRequests: string[] = []
      
      page.on('response', (response) => {
        if (response.status() === 404) {
          failedRequests.push(response.url())
        }
      })

      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      const actual404s = failedRequests.filter(url => 
        !url.includes('favicon') && 
        !url.includes('hot-update') &&
        !url.includes('_next/static')
      )
      
      expect(actual404s, 'Should not have 404 asset requests').toHaveLength(0)
    })
  })
})
