# TechOmnis Website

Production-grade Next.js website for TechOmnis - an end-to-end product engineering agency.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (ScrollTrigger) + Lenis (smooth scroll)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # SEO robots.txt
├── components/
│   ├── layout/             # Layout components (Header, Navigation)
│   ├── sections/           # Page sections (Hero, Services, Works, etc.)
│   └── ui/                 # UI components (Button, Icons, Cursor)
├── content/                # Typed data files (services, cases, reviews, etc.)
├── hooks/                  # Custom React hooks (useMotion, useLenis)
├── lib/                    # Utility functions
└── styles/                 # Additional CSS files
```

## Content Management

All content is stored in typed TypeScript files in `src/content/`:

- `services.ts` - Service offerings and stages
- `cases.ts` - Case studies and featured projects
- `clients.ts` - Client logos and business domains
- `reviews.ts` - Client reviews and score cards
- `team.ts` - Leadership team profiles
- `stats.ts` - Statistics and radar chart data
- `navigation.ts` - Navigation items and section mappings

This structure allows easy migration to a CMS in the future.

## Features

### Animations

- GSAP ScrollTrigger for scroll-based animations
- Lenis for smooth scrolling
- Radar chart animation with GSAP
- Animated underlines and button effects
- Page transition overlay
- Custom cursor that morphs on hover

### Accessibility

- Semantic HTML landmarks
- Skip to content link
- Keyboard-navigable mobile menu (Escape closes, focus return)
- `prefers-reduced-motion` support with in-page toggle
- Proper focus states and ARIA labels
- 4.5:1 contrast ratio for all text

### SEO

- Next.js Metadata API
- Open Graph and Twitter Card meta tags
- JSON-LD Organization schema
- Sitemap and robots.txt
- Semantic HTML structure

## Responsive Breakpoints

The design is responsive at these widths:

- 390px (mobile)
- 768px (tablet)
- 1024px (desktop breakpoint)
- 1440px (desktop reference)
- 1920px (large desktop)

The design uses a viewport-based font sizing system (`font-size: 1vw`) for precise scaling.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual

```bash
pnpm build
pnpm start
```

## Environment Variables

No environment variables required for the basic site. Add as needed for:

- Analytics
- Contact form backend
- CMS integration

## License

Proprietary - TechOmnis
