import { test, expect, Page } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const ARTIFACT_DIR = '/opt/cursor/artifacts/screenshots'
const MOCKUP_DIR = '/tmp/mockups'

const routes = [
  { name: 'home', nextPath: '/', mockupFile: 'v5-uxis.html' },
  { name: 'work', nextPath: '/work', mockupFile: 'pages/work.html' },
  { name: 'work-slug', nextPath: '/work/othego', mockupFile: 'pages/case-study.html' },
  { name: 'services', nextPath: '/services', mockupFile: 'pages/services.html' },
  { name: 'services-slug', nextPath: '/services/mvp-rescue', mockupFile: 'pages/service-detail.html' },
  { name: 'about', nextPath: '/about', mockupFile: 'pages/about.html' },
  { name: 'process', nextPath: '/process', mockupFile: 'pages/process.html' },
  { name: 'contact', nextPath: '/contact', mockupFile: 'pages/contact.html' },
  { name: 'privacy', nextPath: '/privacy', mockupFile: 'pages/privacy.html' },
  { name: 'terms', nextPath: '/terms', mockupFile: 'pages/privacy.html' },
  { name: 'not-found', nextPath: '/nonexistent-page', mockupFile: 'pages/404.html' },
]

async function captureFullPage(page: Page, url: string, outputPath: string): Promise<string[]> {
  const consoleErrors: string[] = []
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  page.on('pageerror', err => {
    consoleErrors.push(err.message)
  })

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1500)
  
  await page.screenshot({ 
    path: outputPath, 
    fullPage: true,
    animations: 'disabled'
  })

  return consoleErrors
}

test.describe('Visual Comparison Tests - Desktop 1440px', () => {
  test.describe.configure({ mode: 'serial' })
  
  for (const route of routes) {
    test(`${route.name}`, async ({ page }, testInfo) => {
      if (!testInfo.project.name.includes('1440')) {
        test.skip()
        return
      }

      const viewport = { width: 1440, height: 900 }
      await page.setViewportSize(viewport)
      
      const mockupScreenshot = path.join(ARTIFACT_DIR, `${route.name}-mockup-1440.png`)
      const nextjsScreenshot = path.join(ARTIFACT_DIR, `${route.name}-nextjs-1440.png`)
      
      const mockupPath = `file://${path.join(MOCKUP_DIR, route.mockupFile)}`
      await captureFullPage(page, mockupPath, mockupScreenshot)
      
      const consoleErrors = await captureFullPage(page, `http://localhost:3000${route.nextPath}`, nextjsScreenshot)
      
      const filteredErrors = consoleErrors.filter(err => 
        !err.includes('Failed to load resource') && 
        !err.includes('favicon') &&
        !err.includes('Lenis')
      )
      
      if (filteredErrors.length > 0) {
        console.log(`Console errors on ${route.nextPath}:`, filteredErrors)
      }
      
      expect(fs.existsSync(nextjsScreenshot), `Screenshot created for ${route.nextPath}`).toBe(true)
      expect(filteredErrors, `No significant console errors on ${route.nextPath}`).toHaveLength(0)
    })
  }
})

test.describe('Visual Comparison Tests - Mobile 390px', () => {
  test.describe.configure({ mode: 'serial' })
  
  for (const route of routes) {
    test(`${route.name}`, async ({ page }, testInfo) => {
      if (!testInfo.project.name.includes('390')) {
        test.skip()
        return
      }

      const viewport = { width: 390, height: 844 }
      await page.setViewportSize(viewport)
      
      const mockupScreenshot = path.join(ARTIFACT_DIR, `${route.name}-mockup-390.png`)
      const nextjsScreenshot = path.join(ARTIFACT_DIR, `${route.name}-nextjs-390.png`)
      
      const mockupPath = `file://${path.join(MOCKUP_DIR, route.mockupFile)}`
      await captureFullPage(page, mockupPath, mockupScreenshot)
      
      const consoleErrors = await captureFullPage(page, `http://localhost:3000${route.nextPath}`, nextjsScreenshot)
      
      const filteredErrors = consoleErrors.filter(err => 
        !err.includes('Failed to load resource') && 
        !err.includes('favicon') &&
        !err.includes('Lenis')
      )
      
      if (filteredErrors.length > 0) {
        console.log(`Console errors on ${route.nextPath}:`, filteredErrors)
      }
      
      expect(fs.existsSync(nextjsScreenshot), `Screenshot created for ${route.nextPath}`).toBe(true)
      expect(filteredErrors, `No significant console errors on ${route.nextPath}`).toHaveLength(0)
    })
  }
})
