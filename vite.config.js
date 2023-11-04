// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  root: "./client",
  build: {
    rollupOptions: {
      // This is where you can input the multiple files
      input: {
        main: "./client/index.html",
        // Add other pages with relative paths from root here
        page1: "./client/Generative/index.html",
        page2: "./client/Websites/index.html",
        page3: "./client/Contact/index.html",
        // Continue for as many HTML files as you have
      },
    },
    outDir: "../dist",
  },
});
