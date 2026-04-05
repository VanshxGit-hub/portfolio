import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        text: '#e2e2e2',
        'text-secondary': '#666',
        accent: '#e2e2e2',
        'accent-dim': '#444',
        border: '#1a1a1a',
        muted: '#333',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config