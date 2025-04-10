/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"NanumSquareRound"', "sans-serif"],
      },
      colors: {
        "main-color": "#FFBF01",
        "text-brown": "#6C3401",
        "sub-color": "rgba(255,191,1,0.15)",
      },
    },
  },
  plugins: [],
};
