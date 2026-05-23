/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#4f46e5",
          yellow: "#a855f7",
          orange: "#f43f5e",
        },
        flipkart: {
          blue: "#4f46e5",    // Sleek Royal Indigo
          yellow: "#8b5cf6",  // Premium Cyber Purple
          orange: "#f43f5e",  // Glowing Neon Coral / Rose
          bg: "#f8fafc",      // Soft Slate Luxury Light-BG
          darkBg: "#0b0f19",  // Deep Space Luxury dark mode
          darkCard: "#161e2f" // Premium glass-slate card
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
