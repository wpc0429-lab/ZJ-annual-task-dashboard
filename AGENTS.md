# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype-specific direction

- The selected direction is “曜石白编辑部”: warm stone canvas, editorial Chinese serif display type, clean sans-serif data type, graphite hairlines, restrained cobalt progress, and emerald reserved only for “年度拳头产品”.
- The primary leadership flow is summary-first: department, scenario, expected completion date, and progress stay visible; clicking a scenario opens the full details in a right-side inspector.
- The current source is `source/人工智能场景计划表-0820.xlsx`; its green fills in the 应用场景 column drive the “年度拳头产品” state, and progress is derived from 是否已完成 (已完成/是 = 100%, 部分完成 = 50%, 否 = 0%). The 子任务 是否演示 column drives the “820演示场景” filter (any scenario where `canDemo === '是'` shows under the 演示筛选 = 820演示场景 dropdown, and its demoable items surface in the inspector’s 2026-08-20演示场景 section).
- The generated `src/ai-plan-data.json` is the replaceable normalized data layer, preserving the source’s department, scenario, subtask, due date, vendor, technical contact, business contact, and special-fill signals.
- Detail drawer responsibility labels use “责任部门”, “需求方 / 业务负责人”, “技术部对接人”, and “研发单位”; business and technical contacts must remain separate rather than collapsing into one owner line.

## Deployment configuration

- `vite.config.mjs` 当前 `base` 为 `/ZJ-annual-task-dashboard/`,针对 GitHub Pages 项目站点(仓库名区分大小写)。
- 部署走 `.github/workflows/deploy.yml`,push 到 `main` 自动 build 并发布到 GitHub Pages。
- 站点访问地址:https://wpc0429-lab.github.io/ZJ-annual-task-dashboard/
- 历史结论:之前的 Cloudflare Pages 部署(根域 `zj-annual-task-dashboard.pages.dev`)需要 `base: "/"`,切换到 GitHub Pages 时务必改回仓库名(本仓库为 `/ZJ-annual-task-dashboard/`,末尾带 `/`)。如需同时兼顾两个平台,建议用环境变量切换 `base`,而不是手改。
