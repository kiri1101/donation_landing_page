/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'frame-auto': '1fr auto',
        'auto-frame': 'auto 1fr',
        'auto2frame': 'auto auto 1fr',
        'auto-frame-auto': 'auto 1fr auto',
        'auto-fill': 'repeat(auto-fill, minmax(10rem, 1fr))',
      },
      gridTemplateRows: {
        'frame-auto': '1fr auto',
        'auto-frame': 'auto 1fr',
        'auto-auto': 'auto auto',
        'auto-frame-auto': 'auto 1fr auto',
      },
    }
  },
  plugins: [],
}

