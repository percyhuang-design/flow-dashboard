# Flow — Project Dashboard

一個現代簡約、深色點綴風格的任務／專案管理 Dashboard UI Prototype,使用 **React + Vite + Tailwind CSS** 製作。

![tech](https://img.shields.io/badge/React-18-61dafb) ![tech](https://img.shields.io/badge/Vite-5-646cff) ![tech](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 功能

- 看板式任務管理(To Do / In Progress / Review / Done)
- 任務卡片可在欄位間「推進／退回」,即時更新統計
- KPI 統計卡片、迷你長條圖、環形完成率
- 衝刺進度條與團隊成員頭像
- 即時搜尋任務(標題／標籤／描述)
- 響應式版面,適配桌機與行動裝置

## 本地開發

```bash
npm install
npm run dev      # 啟動開發伺服器
npm run build    # 產生 production build 至 dist/
npm run preview  # 預覽 production build
```

## 部署

專案已內含 GitHub Actions workflow(`.github/workflows/deploy.yml`),
推送到 `main` 分支後會自動建置並部署到 **GitHub Pages**。

在 repo 的 **Settings → Pages → Source** 選擇 **GitHub Actions** 即可啟用。

## 技術

| 項目 | 說明 |
|------|------|
| 框架 | React 18 |
| 建置工具 | Vite 5 |
| 樣式 | Tailwind CSS 3(自訂深色 token) |
| 字體 | Inter |

---

由 Percy 設計 · UI Prototype
