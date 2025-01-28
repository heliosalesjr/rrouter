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
    outDir: "build_output", // Define explicitamente o diretório de saída
    rollupOptions: {
      output: {
        manualChunks: undefined, // Certifique-se de evitar divisão desnecessária
      },
    },
  },
});
