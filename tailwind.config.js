/** @type {import('tailwindcss').Config} */
// Tokens = maquettes/luna/DESIGN.md (source de vérité visuelle)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D1B5E',
        'ink-deep': '#08133F',
        'ink-soft': '#24366F',
        logo: '#000080',
        gold: '#C99A3B',
        'gold-pale': '#F4E9CF',
        paper: '#FFFFFF',
        mist: '#F3F5F8',
        line: '#DCE1EA',
        body: '#27314D',
        muted: '#65708A',
        focus: '#F2BE55',
        error: '#B42318',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        micro: ['.75rem', { lineHeight: '1.4' }],
        small: ['.875rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.7' }],
        lead: ['1.25rem', { lineHeight: '1.55' }],
        h2: ['1.5rem', { lineHeight: '1.2' }],
        base: ['1rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.2' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      maxWidth: { site: '82rem' },
      spacing: { 22: '5.5rem', 28: '7rem' },
      borderRadius: { sm: '4px', md: '10px', lg: '18px', pill: '999px' },
      boxShadow: {
        card: '0 16px 44px rgba(8, 19, 63, .09)',
        float: '0 24px 64px rgba(8, 19, 63, .18)',
      },
    },
  },
  plugins: [],
}
