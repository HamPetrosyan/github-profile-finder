/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customDarkBlue: "rgb(0, 0, 32)",
        customNormBlue: "rgb(0, 0, 140)",
        customHoverBlue: "rgb(0, 0, 110)",
      },
    },
  },
  plugins: [],
};
