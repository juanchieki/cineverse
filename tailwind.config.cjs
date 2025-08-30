/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#231f10",  // Deep background
        secondary: "#494022", // Muted overlay
        accent: "#cbbe90",   // Gold highlight
        text: "#ffffff",     // White text
      },
    },
  },
  plugins: [],
};
