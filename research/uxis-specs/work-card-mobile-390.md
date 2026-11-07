# UXIS Mobile Work Card Specifications
**Research Date:** November 7, 2026  
**URL:** https://uxis.company/#projects  
**Viewport:** 390px width (mobile)  
**Browser:** Chrome DevTools Mobile Emulation

---

## 1. WORK CARD STRUCTURE

### Card Container
- **Class:** `.cases_it`
- **Layout:** Vertical flex layout (class: `flex-v`)
- **Padding:** `padding-bottom-l8` class applied
- **Gap:** `gap--56-16` class on flex container

### Card Image
- **Height:** 200px (rendered)
- **Width:** 352px (rendered at 390px viewport, nearly full width with padding)
- **Aspect Ratio:** 44:25 (approximately 1.76:1 or 16:9-ish)
- **Border-radius:** Appears to have rounded corners (estimated ~8-12px based on visual inspection)
- **Overlay:** `.dark-layer` div overlays the image creating hover effect
- **Object-fit:** Likely `cover` (standard for card images)

**Gap Between Image and Title:** 
- Part of `.flex-v gap--56-16` container (estimated 16-24px based on class name pattern)

---

## 2. TITLE

### Typography
- **Element:** `<h3>` (e.g., "Workiom", "Ted's Health")
- **Font-family:** "Intelligent Design Avertacy", sans-serif (observed in body styles)
- **Font-size:** Estimated 24-28px (large heading on mobile)
- **Font-weight:** 400 (regular) or 500 (medium)
- **Letter-spacing:** Normal (0px or slight negative)
- **Line-height:** Tight, estimated 1.2-1.3
- **Color:** Black (#222222 or similar)
- **Margin-top:** Included in flex gap above

**Gap Between Title and Tags:**
- Estimated 12-16px (part of flex-v gap system)

---

## 3. TAGS

### Tag Styling
- **Class:** `.tag`
- **Display:** Inline-flex or inline-block
- **Font-size:** 10-11px (very small, uppercase)
- **Text-transform:** UPPERCASE
- **Padding:** Estimated 4px 12px (horizontal padding larger)
- **Border:** 1px solid (black or dark gray)
- **Border-radius:** 20-24px (pill shape / fully rounded ends)
- **Background:** Transparent or white
- **Color:** Black text
- **Gap between tags:** 6-8px (horizontal spacing)

**Examples:**
- "BUSINESS MANAGEMENT", "SAAS", "PLATFORM"
- "HEALTHTECH", "D2C", "WEB APP"

**Gap Between Tags and Metrics:**
- Estimated 16-20px (part of parent flex container gap)

---

## 4. METRICS SECTION

### Layout Structure
- **Class:** `.grid-2col`
- **Display:** CSS Grid
- **Grid-template-columns:** 1fr 1fr (two equal columns)
- **Column-gap:** Estimated 16-24px
- **Vertical separator:** Appears to be a border or divider line between columns

### Metric Item Structure
Each metric consists of:
1. **Label** (above value)
   - Font-size: 10-11px
   - Text-transform: Uppercase or sentence case
   - Font-weight: 400 (normal)
   - Color: Dark gray or black
   - Examples: "Initial CSAT", "CSAT after redesign"

2. **Value** (large number)
   - Font-size: 36-48px (very large)
   - Font-weight: 500-600 (medium to semi-bold)
   - Line-height: 1.0-1.1 (tight)
   - Color: Black

3. **Suffix** (smaller text attached to value)
   - Font-size: 14-16px (smaller than main value)
   - Examples: "of 5", "x4"
   - Positioned inline with value

**OR Alternative Layout (single metric):**
- Large number/prefix: "x4"
- Description below: "purchases rate in first 2 months after redesign."

### Vertical Separator
- **Width:** 1px
- **Height:** Full height of metrics container
- **Color:** Light gray (#E0E0E0 or similar)
- **Position:** Between the two metric columns

### Metrics Container Padding/Margins
- **Margin-top:** Part of flex-v gap (estimated 16-20px from tags)
- **Padding:** Minimal or none (relies on grid gaps)

---

## 5. BLACK CIRCLE ARROW BUTTON

### Button Specifications
- **Class:** `.icon-circle-aro` or similar
- **Shape:** Perfect circle
- **Diameter:** 48-56px (estimated)
- **Background-color:** Black (#000000 or #222222)
- **Border:** None or 1px solid black
- **Position:** absolute (positioned over image)
- **Right offset:** ~16-20px from right edge
- **Bottom offset:** ~16-20px from bottom edge (appears to overlap image bottom-right)
- **Z-index:** High (appears above image)

### Arrow SVG
- **Icon:** Right-pointing arrow (→)
- **SVG size:** ~20-24px (centered in circle)
- **Arrow color:** White (#FFFFFF)
- **Stroke-width:** 1.5-2px

### Hover States
- Not observable in static inspection
- Likely includes scale transform, background color change, or arrow animation

---

## 6. MOBILE NAV BAR

### Container Specifications
- **Position:** Fixed bottom
- **Total height:** 64-72px (estimated)
- **Width:** Full width (390px minus padding)
- **Border-radius:** 24-32px (top corners rounded, creates pill shape)
- **Background:** 
  - Color: rgba(34, 34, 34, 0.95) or similar (semi-transparent dark)
  - Backdrop-filter: blur(10-20px) (frosted glass effect)
- **Box-shadow:** 0 -2px 8px rgba(0,0,0,0.1) or similar
- **Bottom offset:** 16-24px from bottom of screen (safe area padding)
- **Horizontal padding:** 16-20px internal padding

### Nav Items Layout
- **Display:** Flex (horizontal)
- **Justify-content:** space-between or space-around
- **Align-items:** center
- **Gap:** Auto-distributed

### "Home" Button
- **Type:** Text button with icon (hamburger menu icon)
- **Icon:** Three horizontal lines (☰)
- **Font-size:** 14px
- **Color:** White
- **Padding:** 12-16px
- **Background:** Transparent

### "Let's talk" Button
- **Type:** Primary CTA button
- **Font-size:** 14-15px
- **Font-weight:** 500 (medium)
- **Color:** Black text
- **Background-color:** White (#FFFFFF)
- **Padding:** 12px 24px (horizontal padding larger)
- **Border-radius:** 20-24px (pill shape)
- **Box-shadow:** Optional subtle shadow
- **Arrow icon:** → included inline or as pseudo-element

### Spacing
- **Button spacing:** ~24-32px between buttons

---

## 7. ADDITIONAL OBSERVATIONS

### Color Palette
- **Primary text:** #222222 (near black)
- **Background:** #FFFFFF (white)
- **Accent:** Black buttons/borders
- **Borders:** #E0E0E0 or similar light gray

### Typography System
- **Font-family:** "Intelligent Design Avertacy", sans-serif
- **Base font-size:** 14px (body)
- **Scale:** Uses rem-based sizing system
- **Classes:** `.heading-size-large`, `.gap--56-16`, etc. (utility class system)

### Layout System
- **Grid:** `.grid-2col` for two-column layouts
- **Flex:** `.flex-v` for vertical flex layouts
- **Gap classes:** `.gap--56-16` pattern suggests dynamic gap sizing
- **Padding classes:** `.padding-bottom-l8`, `.padding-right--56` pattern

### Responsive Behavior
- Cards stack vertically on mobile
- Full-width images (minus container padding)
- Touch-optimized button sizes (48px+ tap targets)

---

## 8. TECHNICAL NOTES

### Framework/Platform
- **Built with:** Webflow (evidenced by class naming patterns and CDN URLs)
- **CDN:** `cdn.prod.website-files.com`
- **Image format:** WebP (optimized)
- **Lazy loading:** Implemented (`loading="lazy"` attribute)

### CSS Architecture
- **Utility classes:** Extensive use (e.g., `.flex-v`, `.gap--56-16`)
- **BEM-style naming:** Some components (e.g., `.cases_it`)
- **ID-based nodes:** Webflow auto-generated IDs (e.g., `#w-node-e1e89670-f224-6c88-a895-2b8b61285ed2`)

### Accessibility
- **Semantic HTML:** Uses proper heading hierarchy (`<h2>`, `<h3>`)
- **Alt attributes:** Should be verified on images
- **Touch targets:** Buttons appear to meet minimum 44-48px size
- **Safe areas:** Bottom nav respects mobile safe area insets

---

## 9. MEASUREMENTS SUMMARY TABLE

| Element | Property | Value |
|---------|----------|-------|
| **Card Image** | Height | 200px |
| | Width | 352px |
| | Aspect Ratio | 1.76:1 (44:25) |
| | Border-radius | ~8-12px |
| **Title** | Font-size | 24-28px |
| | Font-weight | 400-500 |
| | Line-height | 1.2-1.3 |
| **Tags** | Font-size | 10-11px |
| | Padding | 4px 12px |
| | Border | 1px solid |
| | Border-radius | 20-24px |
| | Gap | 6-8px |
| **Metrics Value** | Font-size | 36-48px |
| | Font-weight | 500-600 |
| **Metrics Label** | Font-size | 10-11px |
| **Arrow Button** | Diameter | 48-56px |
| | Background | Black |
| | Arrow size | 20-24px |
| | Position offset | 16-20px |
| **Nav Bar** | Height | 64-72px |
| | Border-radius | 24-32px |
| | Bottom offset | 16-24px |
| **Let's talk Button** | Padding | 12px 24px |
| | Border-radius | 20-24px |
| | Background | White |

---

## 10. SCREENSHOTS

**Reference screenshots saved to:**
- `/workspace/research/uxis-specs/work-cards-devtools-390.webp` - Full page with DevTools
- DevTools measurements showing rendered sizes: 352×200px image dimensions

**Key Visual Evidence:**
1. Work card with image overlay and dark layer effect
2. Title "Workiom" with tags below
3. Metrics in 2-column grid layout
4. Circle arrow button positioned bottom-right of image
5. Mobile navigation bar with "Home" and "Let's talk" buttons

---

## RESEARCH METHODOLOGY

1. Navigated to https://uxis.company at 390px mobile viewport
2. Used Chrome DevTools Elements panel to inspect HTML structure
3. Measured rendered dimensions via DevTools hover tooltips
4. Observed computed styles in Styles/Computed panels
5. Analyzed class naming patterns and CSS architecture
6. Documented visual spacing via pixel estimation from screenshots
7. Cross-referenced multiple card examples for consistency

**Note:** Some values are estimates based on visual inspection where exact computed values were not directly accessible through automated means. Padding and spacing values should be verified against actual CSS files or computed styles panel for precision.

---

**END OF RESEARCH DOCUMENT**
