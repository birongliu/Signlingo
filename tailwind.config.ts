import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Core Colors
        "feather-green": "#58CC02", // Feather Green
        "mask-green": "#89E219", // Mask Green
        eel: "#4B4B4B", // Eel
        snow: "#FFFFFF", // Snow

        // Secondary Colors
        macaw: "#1CB0F6", // Macaw
        cardinal: "#FF4B4B", // Cardinal
        bee: "#FFC800", // Bee
        fox: "#FF9600", // Fox
        beetle: "#CE82FF", // Beetle
        humpback: "#2B70C9", // Humpback

        // Neutral Colors
        wolf: "#777777", // Wolf
        hare: "#AFAFAF", // Hare
        swan: "#E5E5E5", // Swan
        polar: "#F7F7F7", // Polar
      },
    },
  },
  plugins: [],
};
export default config;
