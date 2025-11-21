/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
  float: "float 6s ease-in-out infinite",
  rotateSlow: "rotateSlow 12s linear infinite",
  fadeIn: "fadeIn 1.2s ease-out forwards",
  pulseGlow: "pulseGlow 4s ease-in-out infinite",
},
keyframes: {
  float: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-15px)" },
  },
  rotateSlow: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  fadeIn: {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0px)" },
  },
  pulseGlow: {
    "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
    "50%": { opacity: 0.55, transform: "scale(1.07)" },
  },
}

    },
  },
  plugins: [],
}

