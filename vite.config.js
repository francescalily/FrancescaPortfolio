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

        page2: "./public/sketch.js",
        page1: "./public/Generative/index.html",
        page1: "./public/Generative/index.js",
        page1: "./public/Generative/styles.css",
        page2: "./public/Websites/index.html",
        page2: "./public/Websites/styles.css",
        page3: "./public/Contact/index.html",
        page4: "./public/Contact/script.js",
        page5: "./public/Contact/style.css",
        // Continue for as many HTML files as you have
      },
    },
    outDir: "../dist",
  },
});
