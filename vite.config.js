import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 4174,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    target: "es2020",
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three-engine";
          }

          if (id.includes("/src/systems/")) {
            return "ees-systems";
          }

          if (id.includes("/src/ui/")) {
            return "ees-interface";
          }

          if (id.includes("/src/config/")) {
            return "ees-content";
          }

          if (
            id.includes("/src/world/") ||
            id.includes("/src/entities/")
          ) {
            return "ees-world";
          }

          return undefined;
        },
      },
    },
  },
});
