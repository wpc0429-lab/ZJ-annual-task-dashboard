import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cloudflare Pages 部署配置:
//   部署到 zj-annual-task-dashboard.pages.dev 时,站点根路径就是 "/",不要带子路径前缀。
//   如果之后想同时部署到 GitHub Pages(<user>.github.io/annual-task-dashboard/),把 base 改回 "/annual-task-dashboard/" 并重新打包即可。
const repoBase = "/";

export default defineConfig({
  base: repoBase,
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
