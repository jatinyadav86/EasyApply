/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        playfair: [`var(--font-playfair-display)`],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          '-moz-appearance': 'textfield',
          '&::-webkit-inner-spin-button': { display: 'none' },
          '&::-webkit-outer-spin-button': { display: 'none' },
        }
      });
    }
  ],
};
