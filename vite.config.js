// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  root: "./public",
  build: {
    rollupOptions: {
      // This is where you can input the multiple files
      input: {
        main: "./public/index.html",
        // Add other pages with relative paths from root here
        page1: "./public/Generative/index.html",
        page2: "./public/Websites/index.html",
        page3: "./public/Contact/index.html",
        // Continue for as many HTML files as you have
      },
    },
    outDir: "../dist",
  },
});
