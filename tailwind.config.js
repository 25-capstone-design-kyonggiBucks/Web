/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
      keyframes: {
        "bounce-bar": {
          "0%, 100%": { transform: "translateY(-30%)" },
          "50%": { transform: "translateY(30%)" },
        },
        "bounce-motion": {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(10%)" },
        },
      },
      animation: {
        "bounce-bar": "bounce-bar 1.8s ease-in-out infinite",
        "bounce-motion": "bounce-motion 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
