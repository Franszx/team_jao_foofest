/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui"],
        grayscale: {

          50: '50%',
 
        }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        foofest: {
          "primary": "#059669",
          "accent": "#BE185D",
          "neutral": "#374151",
          "base-100": "#030712",
          "base-content": "#F9FAFB",
          "neutral-content": "#F9FAFB",
          "primary-content": "#F9FAFB",
        },
      },
    ],
  },
};
