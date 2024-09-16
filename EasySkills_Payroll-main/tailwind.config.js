/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      display: ["after"],
      height: ["after"],
      backgroundColor: ["after"],
      borderWidth: ["after"],
    },
    fontFamily: {
      icon: ["Font Awesome 5 free"],
      sans: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
