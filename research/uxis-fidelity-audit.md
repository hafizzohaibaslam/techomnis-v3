# UXIS Fidelity Audit - TechOmnis

## Commit: f14a373

## Changes Implemented (Based on Measured Specs)

### 1. Project Arrow (Homepage Work Cards)
- **UXIS Reference**: ~70px diameter, ~4px white rim, 16px right inset, ~34px overlap below image, ~21px arrow
- **Implementation**: 
  - `.media .more` on mobile: 17.95rem width/height (~70px), 1.03rem border (~4px), right: 4.1rem (~16px), bottom: -8.72rem (~34px overlap)
  - Arrow SVG: 5.46rem (~21px)
  - Only shown for `hasPage=true` cards (Othego)
  - Hidden for `data-coming-soon` cards

### 2. Metrics Layout
- **UXIS Reference**: Label ~16px, label-to-value gap ~4px
- **Implementation**:
  - `.ov .met .h-sub`: font-size 4.1rem (~16px), tracking -.07rem
  - `.ov .met`: gap 1rem (~4px)
  - `.case-stat`: flex-direction column, gap 1rem

### 3. Mobile Nav
- **UXIS Reference**: ~275x69px overall, ~125x58px left segment, ~135x58px right CTA, ~21px arrow
- **Implementation**:
  - `.menu-c`: height 17.7rem (~69px)
  - `.mob`: padding adjusted for ~125px width, height 14.87rem (~58px)
  - `.talk`: height 14.87rem (~58px)
  - `.talk svg`: width/height 5.46rem (~21px)

### 4. View All Link
- **UXIS Reference**: Full content-width row ~352x62px, centered underlined text+arrow
- **Implementation**:
  - `.view-more`: width 100%, min-height 15.9rem (~62px)
  - `.view-more .btn`: width 100%, justify-content center

## Templates Still Requiring Audit

| Template | Path | Status |
|----------|------|--------|
| Homepage | / | IN PROGRESS |
| Services Overview | /services | NOT AUDITED |
| Service Detail | /services/[slug] | NOT AUDITED |
| Work Listing | /work | NOT AUDITED |
| Work Detail | /work/[slug] | NOT AUDITED |
| Process | /process | NOT AUDITED |
| About | /about | NOT AUDITED |
| Contact | /contact | NOT AUDITED |
| Privacy | /privacy | NOT AUDITED |

## Known Limitations

1. **Font**: UXIS uses "Intelligent Design Avertacy" (commercial). TechOmnis uses Figtree (open source). Cannot copy commercial font without license. Typography matches in size/weight/spacing but face differs.

2. **Othego Artwork**: Currently shows logo on dark field. UXIS reference shows product UI compositions. Need to check if suitable product screenshots exist in repo.

## Viewport Test Matrix

| Viewport | Homepage | Services | Work | Process | About | Contact |
|----------|----------|----------|------|---------|-------|---------|
| 320px | - | - | - | - | - | - |
| 375px | - | - | - | - | - | - |
| 390px | PENDING | ✓ CSS | - | ✓ Portraits | ✓ Map | ✓ Form |
| 430px | - | - | - | - | - | - |
| 768px | - | - | - | - | - | - |
| 1440px | ✓ CSS | ✓ CSS | ✓ CSS | ✓ CSS | ✓ CSS | ✓ CSS |

Legend: ✓ PASS, ✗ FAIL, - NOT TESTED, PARTIAL = some elements tested

## CSS Audit Results

### Desktop 1440px (Explore subagent)
- **Status**: Complete
- No mobile rules leak to desktop
- Base styles complete for all major sections
- Rem scaling verified: 1vw = 14.4px at 1440px
- Hairlines use 1px for crisp rendering
- Footer clears fixed menu

### Othego Artwork
- **Status**: Gap identified
- Current: `/cases/othego.jpg` is only 32KB (logo placeholder)
- UXIS reference shows product UI compositions
- Recommendation: Source actual product screenshots or acknowledge limitation
