/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "space-blue": "#0B1426",
        "cosmic-purple": "#1A0B33",
        "nebula-teal": "#2DD4BF",
        "star-white": "#F8FAFC",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        spinSlow: "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
