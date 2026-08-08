# 人工智能应用场景管理驾驶舱

这是基于《人工智能场景计划表-0803.xlsx》制作的汇报看板，包含真实场景数据、部门进展、年度拳头产品标记，以及场景详情抽屉。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:5173/` 查看看板。

## 生产构建

```bash
npm run build
```

生产文件位于 `dist/`。数据已生成在 `src/ai-plan-data.json`，无需依赖原始 Excel 即可运行。

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），每次 `git push` 到 `main` 分支会自动构建并部署。

### 首次部署步骤

1. 在 GitHub 上新建一个仓库，例如 `annual-task-dashboard`（**必须** Public，否则 Pages 收费）。
2. 本地首次推送：
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/annual-task-dashboard.git
   git push -u origin main
   ```
3. 打开 GitHub 仓库 → **Settings** → **Pages** → **Source** 选择 **GitHub Actions**。
4. 等待 Actions 跑完（约 1-2 分钟），访问：
   `https://<你的用户名>.github.io/annual-task-dashboard/`

### 后续更新

```bash
git add .
git commit -m "update: xxx"
git push
```

推送后 Actions 会自动重新部署。

### 切成"用户页"（可选）

如果想让地址变成 `https://<用户名>.github.io/`（不带仓库名）：

1. 仓库名改成 `<你的用户名>.github.io`。
2. 把 `vite.config.mjs` 里的 `repoBase` 改成 `"/"`。
3. 重新 `git push` 即可。
