import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwind(),     // Tailwind v4 PostCSS adapter
    autoprefixer(),
  ],
};