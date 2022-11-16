/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({addComponents, theme}) {
      addComponents({
        '.button-base': {
          height: theme('height.12'),
          padding: `0 1.0625rem`,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          borderRadius: theme('borderRadius.md'),
        },
        '.button-sm': {
          fontSize: theme('fontSize.sm'),
          height: theme('height.9'),
          padding: `0 ${theme('padding.3')}`,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          borderRadius: theme('borderRadius.md'),
        },
        '.clickable': {
          cursor: theme('cursor.pointer'),
          transition: theme('transition.100'),
          color: theme('colors.gray.900'),
          backgroundColor: theme('colors.zinc.200'),
          '&:hover': {
            backgroundColor: theme('colors.zinc.300'),
          },
        },
        '.clickable-dark': {
          color: theme('colors.zinc.100'),
          backgroundColor: theme('colors.slate.800'),
          '&:hover': {
            backgroundColor: theme('colors.slate.700'),
          },
        },
        '.tag': {
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.sm'),
          lineHeight: theme('lineHeight.none'),
          letterSpacing: theme('letterSpacing.tight'),
        },
      });
    },
  ],
};
