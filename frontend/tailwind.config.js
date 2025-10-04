/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dropShadow: {
          "red-glow": "0 0 8px #dc2626, 0 0 12px #dc2626", // subtle red glow
          "white-glow": "0 0 6px #fff, 0 0 10px #fff", // optional white glow
        },
        inter: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      colors: {
        "stryve-red": "#dc2626",
        "stryve-gray": "#18181b",
        "stryve-dark": "#0a0a0a",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseArrow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10%)" },
        },
        glitch: {
          "0%, 20%, 40%, 60%, 80%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2px, 2px)" },
          "30%": { transform: "translate(2px, -2px)" },
          "50%": { transform: "translate(-2px, -2px)" },
          "70%": { transform: "translate(2px, 2px)" },
          "90%": { transform: "translate(-1px, 1px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        "fadeIn-200": "fadeIn 0.8s ease-out 0.2s forwards",
        "fadeIn-400": "fadeIn 0.8s ease-out 0.4s forwards",
        "fadeIn-600": "fadeIn 0.8s ease-out 0.6s forwards",
        pulseArrow: "pulseArrow 1.5s ease-in-out infinite",
        glitch: "glitch 0.5s infinite",
      },
      backgroundImage: {
        "hero-gradient":
          "repeating-linear-gradient(-45deg, #dc262608, #dc262608 1px, transparent 1px, transparent 10px), radial-gradient(circle at center, #18181b 0%, #0a0a0a 100%)",
        "noise-pattern":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      fontSize: {
        "hero-sm": "3rem", // mobile
        "hero-md": "5rem", // small screens
        "hero-lg": "7rem", // medium screens
        "hero-xl": "10rem", // large screens
      },
      spacing: {
        "hero-button": "3rem",
      },
    },
  },
  plugins: [],
};
