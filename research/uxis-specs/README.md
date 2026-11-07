# UXIS Design Research - Mobile Work Cards

## Research Overview
This directory contains detailed design specifications for UXIS (https://uxis.company) mobile work card components, measured at 390px viewport width.

## Files

### Documentation
- **`work-card-mobile-390.md`** - Complete specifications document with measurements, CSS values, and design patterns for UXIS work cards on mobile

### Code
- **`measure-script.js`** - JavaScript measurement helper script for extracting CSS values via DevTools console

### Screenshots
- **`work-card-overview.webp`** - Initial overview of the work cards page
- **`work-cards-devtools-390.webp`** - DevTools inspection showing HTML structure and computed styles
- **`work-cards-with-nav-390.webp`** - Full page view showing Workiom and Ted's Health cards with mobile navigation
- **`work-cards-final-view-390.webp`** - Final comprehensive view with DevTools panel

## Key Findings

### Card Image
- **Dimensions:** 352×200px (at 390px viewport)
- **Aspect Ratio:** 1.76:1 (44:25)
- **Border-radius:** ~8-12px

### Typography
- **Title:** 24-28px, weight 400-500
- **Tags:** 10-11px uppercase, pill-shaped borders (20-24px radius)
- **Metrics:** 36-48px for values, 10-11px for labels

### Layout
- **Vertical flex:** `.flex-v` with gap system
- **Grid metrics:** `.grid-2col` with 2-column layout
- **Arrow button:** 48-56px diameter, absolute positioned bottom-right

### Navigation Bar
- **Height:** 64-72px
- **Border-radius:** 24-32px (pill shape)
- **Background:** Semi-transparent dark with backdrop blur
- **Bottom offset:** 16-24px from screen edge

## Research Date
November 7, 2026

## Methodology
- Browser: Chrome DevTools mobile emulation
- Viewport: 390px width (standard iPhone width)
- Inspection: DevTools Elements panel, hover measurements, visual analysis
- Platform: Webflow-built site

## Usage
These specifications can be used as a reference for implementing similar work card designs or for comparative analysis of mobile design patterns.

---

**Note:** Some measurements are estimates based on visual inspection. For exact values, refer to the source CSS or use the provided measurement script in a browser console.
