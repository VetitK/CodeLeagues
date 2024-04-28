/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      gray: {
        25: '#FCFCFD',
        50: '#F8F9FC',
        100: '#EAECF5',
        200: '#D5D9EB',
        300: '#ACB0CF',
        400: '#646D94',
        500: '#404874',
        600: '#2E3B6B',
        700: '#28335B',
        800: '#212A4C',
        900: '#081131',
        950: '#111424',
      }
    },
    extend: {
      colors: {
        background: "#FFF",
        foreground: "#000",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        transperent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        primary: {
          25: '#F8F8FF',
          50: '#EBEDFF',
          100: '#D8DBFF',
          200: '#BDC3FF',
          300: '#959FFF',
          400: '#6F7FFF',
          500: '#3354FF',
          600: '#2A45D2',
          700: '#2238A9',
          800: '#1A2B83',
          900: '#152267',
          950: '#0E1744',
        },

      },
    },
  },
  plugins: [require("daisyui")],
};
