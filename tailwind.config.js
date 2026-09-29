/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5EE",
        ink: "#111111",
        sun: "#FFE500",
        bubble: "#FF8FC7",
        sky: "#8FD3FF",
      },
      boxShadow: {
        "brut-sm": "3px 3px 0 #111",
        brut: "5px 5px 0 #111",
        "brut-lg": "8px 8px 0 #111",
      },
      fontFamily: {
        // Chunky display face. Swap for Archivo Black / Dela Gothic One via next/font if you like.
        display: ['"Arial Black"', '"Archivo Black"', '"Helvetica Neue"', "Arial", "sans-serif"],
        body: ['"Helvetica Neue"', "Helvetica", "Arial", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
