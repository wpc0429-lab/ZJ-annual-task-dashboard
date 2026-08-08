import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 项目站点部署配置:
//   仓库地址是 https://github.com/wpc0429-lab/ZJ-annual-task-dashboard.git,
//   站点地址是 https://wpc0429-lab.github.io/ZJ-annual-task-dashboard/,
//   base 必须与仓库名完全一致(区分大小写,末尾带 /)。
//   如果以后改回 Cloudflare Pages 根域部署,把 base 改回 "/" 即可。
const repoBase = "/ZJ-annual-task-dashboard/";

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
