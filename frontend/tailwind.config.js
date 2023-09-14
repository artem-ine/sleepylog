/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Gravitas One"],
        logo: ["Lazydog"],
      },
    },
    colors: {
      primary: "#AB92BF",
      secondary: "#655A7C",
      accent: "#AFC1D6",
      black: "#150C1D",
      white: "#E0E0E0",
    },
  },
  plugins: [],
};
