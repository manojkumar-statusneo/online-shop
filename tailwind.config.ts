import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
                    DEFAULT: '#e6e6e6',
               },
      colors: {
        primary: "#312E8F",
        button: "#1a181e",
        'slate': "#0f172a",
        'gray': "#6b7280",
        body: "#F1F2EA",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        syne: ["var(--font-syne)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/img/ecommerce-images/**",
      },
    ],
  },
};
export default config;
