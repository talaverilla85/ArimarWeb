import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f8',
          100: '#b3e8eb',
          200: '#80d9de',
          300: '#4dcad1',
          400: '#1abcc4',
          500: '#207F85',
          600: '#186A70',
          700: '#13555a',
          800: '#0e4044',
          900: '#092b2e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

