import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 部署配置:
//  - 项目页:  https://<user>.github.io/annual-task-dashboard/  → base: "/annual-task-dashboard/"
//  - 用户页:  https://<user>.github.io/                       → base: "/"
// 如果之后切到用户页,只需把 base 改成 "/" 再 push 即可。
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
