# 個人資料管理系統：專案計畫

## 1. 專案目標

建立一個適合作為金融業 IT／企業內部系統開發職缺求職作品的全端網站，展示下列能力：

- 使用者註冊、登入與登出。
- 登入後管理自己建立的資料，包含新增、查看、修改與刪除。
- 使用 PostgreSQL 持久化資料，重新整理或重新登入後資料仍然存在。
- 在伺服器端落實資料擁有權檢查，使用者只能存取自己的資料。
- 提供基本欄位驗證、清楚的錯誤提示與必要的操作紀錄。
- 完成測試、專案文件、測試帳號及公開部署。

本專案採教學式、小階段開發。每一階段都必須先說明目的，完成後記錄修改檔案、主要程式碼、啟動方式與測試結果，再進入下一階段。

> 資料安全原則：本作品只使用虛構測試資料，不輸入或保存真實身分證字號、金融帳號、密碼或其他敏感個資。

## 2. 版本定義

### 第一版 v1：Next.js 專案骨架與部署驗證

第一版 v1 的目標是建立可執行、可檢查、可版本控制並可公開部署的 Next.js 專案基礎，範圍包含：

- 使用 Next.js App Router、TypeScript、ESLint、Tailwind CSS、npm 與 `src` 目錄建立專案骨架。
- 建立簡單首頁、用途說明、登入／註冊預留入口與 metadata。
- 完成本機 lint、production build 與首頁開啟驗證。
- 建立 GitHub Repository、完成首次推送，並確認本機 `main` 與 `origin/main` 同步。
- 將 GitHub Repository 連接至 Vercel，完成 Production Deployment 與公開首頁 smoke test。

狀態：**已完成**。

### 第二版 v2：個人資料管理 MVP

第二版 v2 的目標是在第一版骨架與部署流程上，完成具備 PostgreSQL、Prisma、帳號驗證、個人紀錄 CRUD、使用者資料隔離、輸入驗證、錯誤處理、操作紀錄及測試的 MVP。

狀態：**尚未開始**。

第二版必須依階段執行；尚未決定的技術事項需先完成決策與記錄，不在計畫階段擅自選定。

## 3. 第一版 v1 完成範圍

第一版 v1 已完成：

- Next.js 專案骨架、首頁、metadata 與基本樣式。
- `npm.cmd run lint` 與 `npm.cmd run build` 驗證。
- GitHub Repository 建立、首次推送及本機／遠端同步確認。
- Vercel 與 GitHub Repository 連接及 Production Deployment。
- 公開網址首頁 smoke test。

第一版 v1 不包含資料庫、帳號驗證、CRUD、API 或第二版 MVP 功能。

## 4. 第二版 v2 MVP 功能範圍

1. 使用者以 Email 與密碼註冊帳號。
2. 使用者登入及登出。
3. 登入後查看自己建立的資料列表。
4. 新增一筆個人資料紀錄。
5. 查看單筆資料紀錄。
6. 修改自己的資料紀錄。
7. 刪除自己的資料紀錄，操作前顯示確認提示。
8. 在前端提供易懂的欄位提示，並在伺服器端執行必要驗證。
9. 顯示操作成功、驗證失敗、查無資料及無權存取等訊息。
10. 新增、修改與刪除資料時建立操作紀錄。
11. 使用者無法查看或操作其他使用者的資料。
12. 提供 README、系統說明、測試方式與測試帳號。
13. 將第二版 MVP 部署到公開網址並完成正式環境驗證。

## 5. 第二版 v2 MVP 不做的功能

- 管理員後台或多角色權限。
- 忘記密碼、Email 驗證與雙因素驗證。
- 真實金融交易或真實敏感個資處理。
- 身分證字號、銀行帳號等高度敏感欄位。
- 檔案或大頭照上傳。
- 大量資料匯入、匯出及複雜搜尋。
- AI Agent、圖表、動畫、通知或其他非必要功能。
- 微服務、事件匯流排、快取層等過度設計。

## 6. 技術選擇

| 類別 | 選擇 | 理由 |
| --- | --- | --- |
| 全端框架 | Next.js（App Router） | 前後端可在同一專案開發，官方工具完整，適合作品集與 Vercel 部署。 |
| 程式語言 | TypeScript | 提供型別檢查，降低欄位與資料流錯誤，符合常見企業開發方式。 |
| 程式碼檢查 | ESLint | 在開發階段提早發現常見程式碼問題。 |
| 樣式 | Tailwind CSS | 可快速建立簡潔一致的介面，不需額外 UI 元件庫。 |
| 資料庫 | PostgreSQL | 主流關聯式資料庫，適合使用者、資料擁有權與稽核紀錄。 |
| ORM | Prisma ORM 穩定版 | Schema、Migration 與型別安全查詢較容易學習；不採用 Early Access 版本。 |
| 身分驗證 | 待決策 | 第二版實作前再比較可用方案；目前不指定 Auth.js 或其他方案。 |
| Session 策略 | 待決策 | 第二版帳號驗證階段再決定 Session 的儲存方式與生命週期。 |
| 密碼雜湊方案 | 待決策 | 第二版帳號驗證階段再選擇可靠演算法、函式庫與參數。 |
| 欄位驗證函式庫 | 待決策 | 第二版驗證階段再評估 Zod 或其他方案，不提前安裝。 |
| 後端操作方式 | 待決策 | 第二版實作前再決定 Server Actions、Route Handlers 或兩者的責任分工。 |
| 測試框架 | 待決策 | 第二版測試階段前再決定單元、整合與端對端測試工具。 |
| 套件管理 | npm | Node.js 隨附、文件普遍，適合初學者。 |
| 部署 | Vercel（第一版已採用） | 已完成 GitHub 整合、Production Deployment 與公開網址 smoke test。 |
| 本機 PostgreSQL 開發方式 | 待決策 | 第二版資料庫階段開始前決定，不提前建立環境。 |
| 雲端資料庫供應商 | 待決策 | Neon PostgreSQL、Prisma Postgres 或其他供應商僅為候選，第二版部署前再評估。 |

### `src` 資料夾決策

已確定使用 `src` 資料夾，應用程式原始碼位於 `src/app`，並與根目錄設定檔及專案文件分離。這是 Next.js 官方建立工具支援的標準選項，已於第一版 v1 實際採用。

## 7. 頁面規劃

| 預計路徑 | 用途 | 存取限制 |
| --- | --- | --- |
| `/` | 系統名稱、用途說明及登入／註冊入口 | 公開 |
| `/register` | 註冊帳號 | 未登入使用者 |
| `/login` | 登入 | 未登入使用者 |
| `/records` | 自己的資料列表 | 需登入 |
| `/records/new` | 新增資料 | 需登入 |
| `/records/[id]` | 查看單筆資料 | 僅資料擁有者 |
| `/records/[id]/edit` | 修改資料 | 僅資料擁有者 |
| `/activity` | 查看自己的操作紀錄 | 需登入 |

第一版 v1 只建立 `/` 首頁。登入與註冊只顯示無功能的預留按鈕，不建立對應頁面或驗證流程。其餘路徑屬於第二版 v2 MVP。

## 8. 第二版 v2 資料表草圖

以下只記錄第二版 v2 的概念設計；第一版 v1 不建立資料庫、Prisma Schema 或資料表。實際 Schema 必須等第二版資料庫階段確認後才建立。

### `User`

| 欄位 | 用途 |
| --- | --- |
| `id` | 使用者唯一識別碼 |
| `email` | 登入帳號，必須唯一 |
| `name` | 顯示名稱 |
| `passwordHash` | 雜湊後的密碼，不保存明文密碼 |
| `createdAt` | 建立時間 |
| `updatedAt` | 更新時間 |

### `PersonalRecord`

第二版 v2 欄位刻意保持簡單，不模擬真實個資核心系統，也不保存高度敏感資料。

| 欄位 | 用途 |
| --- | --- |
| `id` | 紀錄唯一識別碼 |
| `ownerId` | 紀錄擁有者，對應 `User.id` |
| `displayName` | 虛構資料的名稱或標題 |
| `email` | 虛構聯絡 Email |
| `phone` | 虛構聯絡電話，可選 |
| `note` | 簡短備註，可選 |
| `createdAt` | 建立時間 |
| `updatedAt` | 更新時間 |

所有讀取、修改與刪除操作都必須在伺服器端同時使用紀錄 ID 與目前登入者 ID 查詢，不能只靠前端隱藏按鈕。

### `AuditLog`

`AuditLog` 目前只保留在第二版 v2 計畫中，不在第一版 v1 建立資料表。

| 欄位 | 用途 |
| --- | --- |
| `id` | 操作紀錄唯一識別碼 |
| `userId` | 執行操作的使用者 |
| `recordId` | 相關資料紀錄，可選 |
| `action` | `CREATE`、`UPDATE` 或 `DELETE` |
| `details` | 必要摘要，不保存密碼或完整敏感資料 |
| `createdAt` | 操作時間 |

帳號驗證與 Session 方案目前為待決策。若後續方案需要額外資料表，會在第二版帳號驗證階段依當時穩定版官方文件確認，不提前加入。

## 9. 第一版 v1 開發階段與完成條件

### v1 第 0 階段：專案規劃

狀態：**已完成**。

- 檢查工作區與 Node.js／npm 環境。
- 定義功能邊界、技術選擇、頁面、資料表草圖與里程碑。
- 建立並維護本文件。

### v1 第 1 階段：建立專案骨架

狀態：**已完成**。

- 使用 Next.js 官方建立工具產生 TypeScript、ESLint、Tailwind CSS、App Router、`src` 目錄與 npm 專案。
- 建立簡單首頁、用途說明、登入／註冊預留按鈕與 metadata。
- `npm.cmd run dev`、`npm.cmd run lint` 與 `npm.cmd run build` 均通過。
- 第一版未安裝 Prisma、帳號驗證或輸入驗證套件，也未建立資料庫、API、驗證或 CRUD。

### v1 第 2 階段：GitHub 與 Vercel 外部驗證

狀態：**已完成**。

- GitHub Repository 與首次推送已完成。
- 本機 `main` 與 GitHub `origin/main` 已確認同步。
- Vercel 專案已連接 GitHub Repository。
- Vercel Production Deployment 狀態為 `Ready`。
- Production 使用 `main` 分支及 commit `2fffb12`。
- 已實際開啟公開網址並通過首頁 smoke test。

## 10. 第二版 v2 分階段執行順序

第二版 v2 尚未開始。以下階段必須依序進行；每階段開始前先說明目的，完成後記錄修改檔案、主要程式碼、啟動方式與測試結果。

### v2 第 0 階段：確認待決策事項與安全邊界

完成條件：

- 記錄帳號驗證方案、Session 策略與密碼雜湊方案的決策。
- 記錄輸入驗證函式庫、後端操作方式及測試框架的決策。
- 記錄本機 PostgreSQL 開發方式；雲端資料庫供應商可延至部署階段決定。
- 決策前重新核對當時穩定版官方文件，不使用 Early Access 方案。
- 不提交密碼、連線字串、Session Secret 或其他機密。

### v2 第 1 階段：PostgreSQL 與 Prisma 基礎

完成條件：

- 安裝 Prisma 穩定版並建立 PostgreSQL 開發資料庫連線。
- 建立經確認的初始 Schema 與 Migration。
- 能以開發工具確認資料表存在。
- 環境變數與機密資料未提交版本控制。

### v2 第 2 階段：註冊、登入與登出

完成條件：

- 依已記錄的帳號驗證、Session 與密碼雜湊決策實作。
- 密碼以可靠演算法雜湊後保存，不保存明文密碼。
- 可完成註冊、登入與登出。
- 受保護頁面要求有效登入狀態。
- 已測試錯誤帳密、重複 Email 與未登入存取。

### v2 第 3 階段：新增與列表

完成條件：

- 登入者可新增經驗證的虛構資料紀錄。
- 列表只顯示目前登入者的資料。
- 重新整理與重新登入後資料仍存在。

### v2 第 4 階段：查看、修改與刪除

完成條件：

- 可查看、修改及刪除自己的紀錄。
- 刪除前需要確認。
- 成功與失敗狀態都有清楚提示。

### v2 第 5 階段：使用者資料隔離

完成條件：

- 所有資料操作都在伺服器端檢查 `ownerId`。
- 竄改網址或紀錄 ID 不能查看、修改或刪除其他使用者資料。
- 越權情境具有可重複測試步驟。

### v2 第 6 階段：操作紀錄

完成條件：

- 新增、修改與刪除會建立 `AuditLog`。
- 操作紀錄不包含密碼或完整敏感資料。
- 登入者可查看自己的必要操作紀錄。

### v2 第 7 階段：輸入驗證與錯誤處理

完成條件：

- 主要欄位具有前端提示與伺服器端驗證。
- 常見錯誤有一致且不洩漏系統細節的訊息。
- 操作成功、驗證失敗、查無資料及無權存取均有清楚提示。

### v2 第 8 階段：測試

完成條件：

- 先完成測試框架與測試層級決策，再新增測試。
- 覆蓋註冊、登入、登出、CRUD、驗證失敗及越權情境。
- 主要測試可重複執行，測試資料只使用虛構內容。
- lint、TypeScript 與 production build 均通過。

### v2 第 9 階段：文件與正式環境驗證

完成條件：

- README 包含系統說明、安裝、啟動及測試方式。
- 建立只含虛構資料的測試帳號。
- 完成雲端 PostgreSQL 供應商決策與正式環境設定。
- 將第二版 MVP 部署至 Vercel 並完成正式環境測試。
- 文件不包含資料庫密碼、Session Secret 或其他機密。

## 11. 目前進度

更新日期：2026-08-06（Asia/Taipei）

| 版本 | 狀態 | 說明 |
| --- | --- | --- |
| 第一版 v1 | 已完成 | Next.js 骨架、首頁、lint、build、GitHub 首次推送、本機與遠端同步、Vercel Production Deployment 及公開首頁 smoke test 均已完成。 |
| 第二版 v2 | 尚未開始 | PostgreSQL、Prisma、帳號驗證、CRUD、資料隔離、輸入驗證、錯誤處理、操作紀錄及測試均尚未實作。 |

### 環境檢查紀錄

- 工作區：`D:\Projects\動態網站`
- 專案路徑：`D:\Projects\動態網站\personal-data-management`
- Node.js：`v24.18.0`
- npm：`11.16.0`；PowerShell 執行原則會攔截 `npm.ps1`，因此使用 `npm.cmd` 與 `npx.cmd`，未修改系統安全設定。
- Git：實際檢查版本為 `2.53.0.windows.3`。
- Visual Studio Code：`1.129.0`
- Next.js：`16.2.10`
- React／React DOM：`19.2.4`
- TypeScript：`5.9.3`（`package.json` 宣告 `^5`）
- ESLint：`9.39.5`（`package.json` 宣告 `^9`）
- Tailwind CSS：`4.3.2`（`package.json` 宣告 `^4`）
- 工作區已由 OneDrive 搬移至本機路徑 `D:\Projects\動態網站`，專案建立於此路徑下。

### 第一版 v1 本機驗證結果

- `npm.cmd run lint`：通過，Exit code 0，無 ESLint 錯誤。
- `npm.cmd run build`：通過，Exit code 0；Next.js 編譯、TypeScript 檢查與靜態頁面產生均成功。
- `npm.cmd run dev`：開發伺服器成功啟動。
- `http://localhost:3000`：回傳 HTTP 200，首頁內容已確認。
- npm 安裝稽核曾回報 2 個 moderate severity 相依套件弱點；第一版未執行可能造成破壞性版本變更的 `npm audit fix --force`。

### 第一版 v1 GitHub 與 Vercel 驗證結果

驗證日期：2026-08-06（Asia/Taipei）

- Git 狀態：位於 `main` 分支、與 `origin/main` 同步，working tree clean。
- 本機 `main` 與 GitHub `origin/main` 最新 commit 相同：`2fffb12286cd408a1b081168ba38c65fa95d3ba8`。
- GitHub Repository 與首次推送已完成，遠端 `main` 同步正常。
- GitHub Repository：`https://github.com/minghan-tsai/personal-data-management.git`
- Vercel 專案已連接 GitHub Repository。
- Vercel Production Deployment 狀態：`Ready`。
- Vercel 部署分支：`main`。
- Vercel 部署 commit：`2fffb12`。
- 公開網址：`https://personal-data-management.vercel.app`
- 已實際開啟公開網址，首頁 smoke test 通過。

### 第二版 v2 尚未完成項目

- 尚未安裝 Prisma、帳號驗證或輸入驗證套件。
- 尚未建立資料庫、環境變數、帳號驗證、API、CRUD、資料隔離、操作紀錄或測試。
- Auth、Session、密碼雜湊、輸入驗證函式庫、後端操作方式、測試框架、本機 PostgreSQL 開發方式及雲端資料庫供應商均仍為待決策。

## 12. 重要技術決策紀錄

| 日期 | 決策 | 原因 |
| --- | --- | --- |
| 2026-07-16 | 採用 Next.js App Router、TypeScript、ESLint 與 Tailwind CSS | 主流、官方建立工具直接支援，適合逐步教學與全端作品。 |
| 2026-07-16 | 確定使用 `src` 資料夾 | 將應用程式碼與根目錄設定、文件分離；已在第一版 v1 實際採用。 |
| 2026-07-16 | 套件管理採 npm | 與 Node.js 一起提供，初學者文件與範例最多。 |
| 2026-07-16 | 第二版資料庫採 PostgreSQL、ORM 採 Prisma 穩定版 | 展示關聯式資料設計與型別安全查詢，不使用 Early Access 產品。 |
| 2026-07-16 | `PersonalRecord` 只保留簡單、虛構聯絡資料 | 避免把作品做成真實個資核心系統，降低敏感資料與範圍風險。 |
| 2026-07-16 | `AuditLog` 在第二版 v2 實作 | 第一版 v1 只建立骨架與部署驗證，不提前進入資料庫功能。 |
| 2026-07-16 | PowerShell 套件指令使用 `npm.cmd`／`npx.cmd` | 避免修改電腦執行原則，仍可正常執行 npm 官方工具。 |
| 2026-07-16 | 首頁不載入遠端 Google Fonts | 使用系統字型，避免本機開發及 production build 依賴外部字型網路連線。 |
| 2026-08-06 | 將版本明確分為第一版 v1 與第二版 v2 | 第一版聚焦專案骨架及 GitHub／Vercel 驗證；第二版完成個人資料管理 MVP。 |
| 2026-08-06 | 第一版 v1 標記為已完成 | GitHub 同步、Vercel Production Deployment 與公開首頁 smoke test 均已驗證。 |
| 2026-08-06 | Auth、Session、密碼雜湊、輸入驗證函式庫、後端操作方式及測試框架維持待決策 | 第二版對應階段開始前再依穩定版文件評估，不提前選定或安裝。 |
| 2026-08-06 | 本機 PostgreSQL 開發方式及雲端資料庫供應商維持待決策 | 第二版資料庫與部署階段再評估實際環境需求。 |

## 13. 測試、啟動與公開網址

目前 PowerShell 環境使用 `.cmd` 入口，避免 `npm.ps1` 受到執行原則攔截。

```powershell
node --version
npm.cmd --version
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

- 本機開發網址：`http://localhost:3000`
- 第一版 v1 公開網址：`https://personal-data-management.vercel.app`
