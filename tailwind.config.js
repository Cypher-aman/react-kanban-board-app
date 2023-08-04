/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      blue: {
        dark: "#635FC7",
        light: "#A8A4FF",
      },
      black: {
        vDark: "#000112",
        dark: "#20212C",
        light: "#2B2C37",
      },
      grey: {
        vDark: "#3E3F4E",
        dark: "#828FA3",
        light: "#E4EBFA",
        vLight: "#F4F7FD",
      },
      white: "#FFFFFF",
      red: {
        dark: "#EA5555",
        light: "#FF9898",
      },
    },
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
      },
    },
    plugins: [],
  },
};
