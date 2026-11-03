import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ['var(--font-figtree)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        ink: '#222',
        'ink-70': 'rgba(34, 34, 34, 0.7)',
        hair: '#e2e2e2',
      },
    },
  },
  plugins: [],
}

export default config
