import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/Bus_CBT/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});