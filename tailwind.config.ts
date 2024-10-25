import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
         black_01:"#141414",
         black_02:"#1A1A1A",
         grey_01:"#999999",
         red_01:"#E50000"
      },
      keyframes: {
        slideLeftCentered: {
          '0%': { transform: 'translateX(0%)' }, // Start at center
          '100%': { transform: 'translateX(-100%)' }, // Move left
        },
      },
      animation: {
        slideLeftSlow: 'slideLeftCentered 50s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
