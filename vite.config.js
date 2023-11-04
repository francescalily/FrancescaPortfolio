import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  root: "./public",
  build: {
    rollupOptions: {
      input: {
        main: "./public/index.html",
        generative: "./public/Generative/index.html",
        websites: "./public/Websites/index.html",
        contact: "./public/Contact/index.html",
      },
    },
    outDir: "../dist",
  },
});
