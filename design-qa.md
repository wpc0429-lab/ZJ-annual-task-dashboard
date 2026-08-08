# Design QA

## Comparison target

- Source visual truth: `/Users/huangxi/.codex/generated_images/019fd598-1c1f-71f2-ae91-4228dacac1e4/exec-a4b77d35-1779-46c6-94a0-6ae39a12bab6.png` (selected ideation direction 2, “曜石白编辑部”).
- Normalized source: `/Users/huangxi/Documents/工作整理/outputs/annual-task-dashboard/qa-source-1440.png`.
- Implementation screenshot: `/Users/huangxi/Documents/工作整理/outputs/annual-task-dashboard/qa-responsibility-final-1440.png`.
- Viewport: CSS 1440 × 1024; implementation capture 1425 × 1013 because the all-department real-data view has a native vertical scrollbar; source original 1487 × 1058, normalized to the same aspect ratio for comparison; density normalized 1:1.
- State: 2026 年度、全部部门、默认选中“公文材料智能写作”、右侧场景详情抽屉打开；数据来自真实 Excel。

## Evidence

### Full-view comparison

The normalized source and final implementation were opened and compared at the same desktop aspect ratio and interaction state. The implementation preserves the source’s editorial composition: warm stone canvas, large Chinese serif title, hairline rules, restrained cobalt progress, emerald-only “年度拳头产品” emphasis, department-led vertical rhythm, bottom milestone ribbon, and flush right-side detail inspector. The real workbook contains 8 departments and 31 unique scenes after excluding the requested row, so the full data view intentionally scrolls below the fold; the top-level summary and department filter keep the leadership view focused.

### Focused regions

- Header and summary: display typography, year/department controls, overall progress, scenario count, punch-product count, and attention count are aligned to the selected reference hierarchy.
- Department matrix: each row exposes only scenario, expected completion date, progress, and a lightweight selected state; green is reserved for punch-product rails and labels.
- Detail inspector: selected scenario title, department, due date, progress, milestone sequence, owner, and next action are visible without leaving the page.
- Interaction states: risk scenario opens a risk note; department filter selects the first scenario in that department; year switch updates dates; quarter nodes jump to the mapped scenario; close button removes the inspector.

## Findings

- [P2 — fixed] Initial implementation exceeded the 1024px briefing viewport by 427px, which hid the lower departments and milestone ribbon. Compact presentation spacing was added for the source composition; the filtered leadership view is scrollbar-free at 1440 × 1024.
- [P3 — expected] The real workbook contains 8 departments and 32 scenes, so showing every department at once requires page scroll. The default view exposes compact summaries only; the department selector and right-side detail drawer keep detailed content out of the first screen.
- [P2 — fixed] The user requested removing “智能大厅服务”; the normalized data layer now excludes it, reducing the unique scene count from 32 to 31.
- [P2 — fixed] The user requested that punch products not repeat the text label on every row; punch rows now use a full-row pale-green treatment, green rail, and stronger typography while the legend and summary retain the semantic label.
- [P2 — fixed] The user requested removing the introductory explanation block below the title; the dashboard now moves directly from the header into the executive summary metrics.
- [P2 — fixed] The page title is now “人工智能应用场景管理驾驶舱”, with a single-line desktop treatment for the briefing viewport.
- [P2 — fixed] The detail drawer now distinguishes “责任部门”, “需求方 / 业务负责人”, “技术部对接人”, and “研发单位”; for “公文材料智能写作” the values are 综合部、林烨、王炜、华云数据.

## Verification

- Primary interaction tests passed: scenario detail open, risk note visibility, department filter, year switch, quarter-node navigation, and detail close.
- Real-data checks passed: 8 department filter options, 12 green “年度拳头产品” scenes, status-derived progress, mixed Excel/text date normalization, vendor/technical/business contact fields in the inspector.
- Comment follow-up checks passed: `智能大厅服务` is absent, the legacy inline label is absent from the punch row, and `#scenario-ai-02` carries the `is-punch` row treatment.
- Latest comment follow-up checks passed: `.intro-row` is absent, the exact title text is “人工智能应用场景管理驾驶舱”, and the title renders on one line at 1440 × 1024.
- Responsibility follow-up checks passed: the legacy “所属部门” label is absent; the selected scenario shows 林烨 as the business owner, 王炜 as the technical contact, and 华云数据 as the primary R&D unit.
- Browser console warnings/errors: none observed.
- Build and packaging: `npm run build` and `npm run test:sites` passed; the Sites-compatible output was generated and its worker tests passed.

## Final result

passed
