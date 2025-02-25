import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure it scans all files
  theme: {
    extend: {
      colors: {
        border: "hsl(214, 32%, 91%)", // Custom border color
      },
    },
  },
  plugins: [],
};

export default config;
