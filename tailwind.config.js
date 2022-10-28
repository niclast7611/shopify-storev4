/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#000",
        "secondary-color": "#577786",
        "background-color": "#FFF",
        "accent-color": "#64aa85",
      },
    },
  },
  plugins: [],
};
