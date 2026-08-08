import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 项目站点部署配置:
//   站 点 地 址 是 https://<user>.github.io/annual-task-dashboard/,所以 base 必须是仓库名 (末尾带 /)。
//   如果以后改回 Cloudflare Pages 根域部署,把 base 改回 "/" 即可。
const repoBase = "/annual-task-dashboard/";

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
