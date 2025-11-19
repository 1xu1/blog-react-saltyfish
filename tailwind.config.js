/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        'neon': '0 0 2px rgba(255, 255, 255, 0.8), 0 0 1em rgba(44, 71, 168, 0.6), 0 0 0.5em rgba(44, 71, 168, 0.8), 0 0 0.1em rgba(44, 71, 168, 0.8), 0 10px 3px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
