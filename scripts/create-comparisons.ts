import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

const routes = [
  'home', 'work', 'work-slug', 'services', 'services-slug',
  'about', 'process', 'contact', 'privacy', 'terms', 'not-found'
]

const viewports = ['1440', '390']

async function createComparison(route: string, viewport: string) {
  const mockupPath = path.join(SCREENSHOT_DIR, `${route}-mockup-${viewport}.png`)
  const nextjsPath = path.join(SCREENSHOT_DIR, `${route}-nextjs-${viewport}.png`)
  const outputPath = path.join(SCREENSHOT_DIR, `${route}-comparison-${viewport}.png`)
  
  if (!fs.existsSync(mockupPath) || !fs.existsSync(nextjsPath)) {
    console.log(`Skipping ${route}-${viewport}: missing files`)
    return
  }
  
  const mockup = await sharp(mockupPath).metadata()
  const nextjs = await sharp(nextjsPath).metadata()
  
  const maxHeight = Math.max(mockup.height || 0, nextjs.height || 0)
  const targetWidth = parseInt(viewport)
  
  const mockupResized = await sharp(mockupPath)
    .resize({ width: targetWidth, height: maxHeight, fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer()
  
  const nextjsResized = await sharp(nextjsPath)
    .resize({ width: targetWidth, height: maxHeight, fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer()
  
  const labelHeight = 50
  const spacing = 20
  const totalWidth = (targetWidth * 2) + spacing
  const totalHeight = maxHeight + labelHeight
  
  await sharp({
    create: {
      width: totalWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      { input: mockupResized, top: labelHeight, left: 0 },
      { input: nextjsResized, top: labelHeight, left: targetWidth + spacing },
    ])
    .png()
    .toFile(outputPath)
  
  console.log(`Created: ${route}-comparison-${viewport}.png`)
}

async function main() {
  console.log('Creating side-by-side comparisons...\n')
  
  for (const route of routes) {
    for (const viewport of viewports) {
      try {
        await createComparison(route, viewport)
      } catch (err) {
        console.error(`Error creating ${route}-${viewport}:`, err)
      }
    }
  }
  
  console.log('\nDone!')
}

main()
