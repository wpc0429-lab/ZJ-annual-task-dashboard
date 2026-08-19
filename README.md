# 人工智能应用场景管理驾驶舱

浙江电力交易中心 AI 场景建设管理驾驶舱：按部门汇总年度 AI 应用场景的整体进度、进行中场景、最近完成时间，支持点击场景在右侧详情抽屉中查看里程碑、责任分工与备注。

**在线地址**：<https://wpc0429-lab.github.io/ZJ-annual-task-dashboard/>

## 功能特性

- 年度 / 部门筛选，按部门分组展示 AI 应用场景
- 场景列表展示进度条、完成状态、最近完成时间
- 点击场景打开右侧详情抽屉：责任部门、预计完成时间、当前进度、里程碑计划、责任分工、备注
- "年度拳头产品"（Excel 绿色标记）以品牌色高亮，蓝色标记为待定场景
- 年度交付里程碑时间轴

## 技术栈

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- [Phosphor Icons](https://phosphoricons.com/)
- 数据由 [SheetJS / xlsx](https://sheetjs.com/) 从 Excel 生成静态 JSON

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

## 数据更新

1. 将最新的 Excel 计划表放入 `source/` 目录
2. 运行生成脚本（会自动选择文件名日期最新的计划表）：

```bash
node scripts/generate-ai-data-v2.mjs
```

生成结果写入 `src/ai-plan-data.json`（可替换的规范化数据层），保留部门、场景、子任务、截止日期、厂商、业务负责人、技术部对接人及特殊填充信号。

## 部署

当前部署到 GitHub Pages 项目站点，push 到 `main` 分支后由 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 自动构建发布。

- `vite.config.mjs` 中 `base` 必须为 `/ZJ-annual-task-dashboard/`（与仓库名一致、区分大小写、末尾带 `/`）
- 若切换回 Cloudflare Pages 根域部署，需将 `base` 改为 `/`

## 项目结构

```
src/
  App.jsx              # 应用主界面与组件
  ai-plan-data.json    # 规范化数据层（Excel 生成）
  styles.css           # 样式
scripts/
  generate-ai-data-v2.mjs   # Excel → JSON 数据生成脚本
source/                # 源 Excel 计划表
worker/                # Sites/Worker 相关
tests/                 # 站点 worker 测试
.github/workflows/     # GitHub Pages 自动部署
```

## 联系人与备注

- 业务负责人与技术部对接人分别展示，不会合并为单一负责人
- 详情抽屉底部仅在 Excel 备注列有内容时显示"备注"区块
