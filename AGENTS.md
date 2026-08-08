# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype-specific direction

- The selected direction is “曜石白编辑部”: warm stone canvas, editorial Chinese serif display type, clean sans-serif data type, graphite hairlines, restrained cobalt progress, and emerald reserved only for “年度拳头产品”.
- The primary leadership flow is summary-first: department, scenario, expected completion date, and progress stay visible; clicking a scenario opens the full details in a right-side inspector.
- The current source is `/Users/huangxi/Desktop/人工智能场景计划表-0803.xlsx`; its green fills in the 应用场景 column drive the “年度拳头产品” state, and progress is derived from 是否已完成 (已完成/是 = 100%, 部分完成 = 50%, 否 = 0%).
- The generated `src/ai-plan-data.json` is the replaceable normalized data layer, preserving the source’s department, scenario, subtask, due date, vendor, technical contact, business contact, and special-fill signals.
- Detail drawer responsibility labels use “责任部门”, “需求方 / 业务负责人”, “技术部对接人”, and “研发单位”; business and technical contacts must remain separate rather than collapsing into one owner line.
