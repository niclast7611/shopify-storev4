/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#8e8d8a",
        "secondary-color": "#e85a4f",
        "background-color": "#d8c3a5",
        "accent-color": "#fff",
      },
    },
  },
  plugins: [],
};
