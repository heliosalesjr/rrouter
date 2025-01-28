import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "build/client", // this is the output directory, I've had to change it to build/client instead of dist and change that on vercel as well
    emptyOutDir: true,
    
    
  },
  plugins: [reactRouter(), tsconfigPaths()],
});
