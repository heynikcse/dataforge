/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#050505',
        orange: '#FF5A1F',
        offwhite: '#F5F5F3',
        gray: {
          DEFAULT: '#7A7A78',
        },
        line: 'rgba(245,245,243,0.08)',
        lineStrong: 'rgba(245,245,243,0.16)',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
