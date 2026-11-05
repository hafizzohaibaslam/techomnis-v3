import { test, expect, Page } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const ARTIFACT_DIR = '/opt/cursor/artifacts/uxis-comparison'
const UXIS_BASE = 'https://uxis.company'
const OUR_BASE = 'http://localhost:3000'

const pagePairs = [
  { name: 'home', ours: '/', uxis: '/' },
  { name: 'work', ours: '/work', uxis: '/projects' },
  { name: 'work-case', ours: '/work/othego', uxis: '/projects/teds-health' },
  { name: 'services', ours: '/services', uxis: '/services' },
  { name: 'process', ours: '/process', uxis: '/process' },
  { name: 'about', ours: '/about', uxis: '/about' },
  { name: 'contact', ours: '/contact', uxis: '/contacts' },
  { name: 'privacy', ours: '/privacy', uxis: '/policy' },
]

async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)
  await page.evaluate(() => {
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(500)
}

async function captureFullPage(page: Page, url: string, outputPath: string) {
  const consoleErrors: string[] = []
  
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await waitForPageReady(page)
  
  await page.screenshot({ path: outputPath, fullPage: true, animations: 'disabled' })
  return consoleErrors
}

async function captureScrollFrames(page: Page, outputDir: string, name: string, frames: number = 20) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewport = page.viewportSize()
  if (!viewport) return
  
  const scrollStep = Math.floor((height - viewport.height) / (frames - 1))
  
  for (let i = 0; i < frames; i++) {
    const scrollY = Math.min(i * scrollStep, height - viewport.height)
    await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(150)
    await page.screenshot({
      path: path.join(outputDir, `${name}-frame-${String(i).padStart(2, '0')}.png`)
    })
  }
}

async function inspectElements(page: Page, selectors: string[]) {
  const results: Record<string, any> = {}
  
  for (const selector of selectors) {
    try {
      const el = page.locator(selector).first()
      if (await el.count() > 0) {
        const box = await el.boundingBox()
        const styles = await el.evaluate((node) => {
          const cs = getComputedStyle(node)
          return {
            borderTop: cs.borderTop,
            borderBottom: cs.borderBottom,
            borderLeft: cs.borderLeft,
            borderRight: cs.borderRight,
            background: cs.background,
            backgroundColor: cs.backgroundColor,
            stroke: (node as SVGElement).style?.stroke || '',
            strokeWidth: (node as SVGElement).style?.strokeWidth || '',
            color: cs.color,
            fontSize: cs.fontSize,
            lineHeight: cs.lineHeight,
            padding: cs.padding,
            margin: cs.margin,
            width: cs.width,
            height: cs.height,
            gap: cs.gap,
            display: cs.display,
            position: cs.position,
          }
        })
        results[selector] = { box, styles }
      }
    } catch (e) {
      results[selector] = { error: String(e) }
    }
  }
  return results
}

test.describe('UXIS vs Our Site Comparison', () => {
  test.beforeAll(() => {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true })
    fs.mkdirSync(path.join(ARTIFACT_DIR, 'frames'), { recursive: true })
  })

  for (const viewport of [{ name: '1440', width: 1440, height: 900 }, { name: '390', width: 390, height: 844 }]) {
    test.describe(`Viewport ${viewport.name}px`, () => {
      for (const pair of pagePairs) {
        test(`Compare ${pair.name}`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height })
          
          const uxisPath = path.join(ARTIFACT_DIR, `${pair.name}-uxis-${viewport.name}.png`)
          const oursPath = path.join(ARTIFACT_DIR, `${pair.name}-ours-${viewport.name}.png`)
          
          console.log(`Capturing UXIS: ${UXIS_BASE}${pair.uxis}`)
          await captureFullPage(page, `${UXIS_BASE}${pair.uxis}`, uxisPath)
          
          console.log(`Capturing Ours: ${OUR_BASE}${pair.ours}`)
          const errors = await captureFullPage(page, `${OUR_BASE}${pair.ours}`, oursPath)
          
          expect(fs.existsSync(uxisPath), `UXIS screenshot exists for ${pair.name}`).toBe(true)
          expect(fs.existsSync(oursPath), `Our screenshot exists for ${pair.name}`).toBe(true)
          
          const filteredErrors = errors.filter(e => 
            !e.includes('favicon') && !e.includes('Lenis') && !e.includes('Failed to load')
          )
          expect(filteredErrors, `No console errors on ${pair.ours}`).toHaveLength(0)
        })
      }
    })
  }

  test('Inspect UXIS homepage dividers and lines', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(UXIS_BASE, { waitUntil: 'networkidle', timeout: 60000 })
    await waitForPageReady(page)
    
    const lineData = await page.evaluate(() => {
      const lines: any[] = []
      
      document.querySelectorAll('svg line, svg path, [class*="line"], [class*="divider"], [class*="separator"]').forEach((el, i) => {
        const cs = getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        lines.push({
          index: i,
          tag: el.tagName.toLowerCase(),
          className: el.className,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          stroke: cs.stroke || (el as SVGElement).getAttribute('stroke'),
          strokeWidth: cs.strokeWidth || (el as SVGElement).getAttribute('stroke-width'),
          fill: cs.fill || (el as SVGElement).getAttribute('fill'),
          borderTop: cs.borderTop,
          borderBottom: cs.borderBottom,
          backgroundColor: cs.backgroundColor,
        })
      })
      
      return lines
    })
    
    const report = {
      url: UXIS_BASE,
      timestamp: new Date().toISOString(),
      lineCount: lineData.length,
      lines: lineData.slice(0, 50),
    }
    
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, 'uxis-lines-report.json'),
      JSON.stringify(report, null, 2)
    )
  })

  test('Capture UXIS homepage scroll animation frames', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(UXIS_BASE, { waitUntil: 'networkidle', timeout: 60000 })
    await waitForPageReady(page)
    
    const framesDir = path.join(ARTIFACT_DIR, 'frames')
    await captureScrollFrames(page, framesDir, 'uxis-home', 30)
  })

  test('Capture our homepage scroll animation frames', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(OUR_BASE, { waitUntil: 'networkidle', timeout: 60000 })
    await waitForPageReady(page)
    
    const framesDir = path.join(ARTIFACT_DIR, 'frames')
    await captureScrollFrames(page, framesDir, 'our-home', 30)
  })
})
