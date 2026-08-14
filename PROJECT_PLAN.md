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

狀態：**開發中**。v2 第 0～4 階段已完成，v2 第 5 階段尚未開始。

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
| 資料庫 | PostgreSQL 18 | Windows 本機開發環境已安裝 PostgreSQL 18；正式環境未來使用部署環境可連線的 PostgreSQL，不依賴本機 `localhost`。 |
| ORM／Database Toolkit | Prisma 7.9.1 | 已用於 PostgreSQL 資料存取、Schema、Migration 與 Prisma Client 產生。 |
| 身分驗證 | Better Auth 1.6.27（已實作） | 已完成 Email／Password 註冊、登入與登出；不做 OAuth、Email 驗證、忘記密碼或 2FA。 |
| Session 策略 | 資料庫 Session（已實作） | Session 儲存於 PostgreSQL；受保護頁面在伺服器端驗證有效 Session，不能只因 Cookie 存在就視為已登入。 |
| 密碼雜湊方案 | Better Auth 預設方案（已實作） | credential hash 儲存於 `Account.password`；不自行發明密碼演算法或增加第二層雜湊，資料庫不保存明文密碼。 |
| 欄位驗證函式庫 | Zod 穩定版（已決策、尚未安裝） | 所有外部輸入都必須經過伺服器端執行時驗證。 |
| 後端操作方式 | Server Components、Server Actions、Route Handlers 分工 | 讀取、網站內部異動及必要 HTTP API 各自使用對應機制，不重複建立 `/api/records` CRUD。 |
| 測試策略 | 單元與整合／流程測試為主 | 每階段先執行人工驗證、lint 與 build；後續逐步加入 Vitest 與 Playwright，相關套件尚未安裝。 |
| 套件管理 | npm | Node.js 隨附、文件普遍，適合初學者。 |
| 部署 | Vercel（第一版已採用） | 已完成 GitHub 整合、Production Deployment 與公開網址 smoke test。 |
| 本機 PostgreSQL 開發方式 | Windows 本機直接安裝（已完成） | PostgreSQL 18、pgAdmin 4 與 Command Line Tools 已安裝於 D 槽，開發資料庫已建立。 |
| 雲端資料庫供應商 | 待決策 | v2 第 9 階段再比較 Neon、Supabase、Prisma Postgres 或其他託管 PostgreSQL。 |

### `src` 資料夾決策

已確定使用 `src` 資料夾，應用程式原始碼位於 `src/app`，並與根目錄設定檔及專案文件分離。這是 Next.js 官方建立工具支援的標準選項，已於第一版 v1 實際採用。

### v2 第 0 階段技術決策

#### 1. 本機 PostgreSQL 開發方式

- Windows 本機直接安裝 PostgreSQL。
- 開發期間使用本機 PostgreSQL，搭配 pgAdmin 與 Command Line Tools。
- 開發資料庫命名為 `personal_data_management_dev`。
- PostgreSQL 程式與資料目錄均位於 D 槽。
- 正式環境不直接連線至本機資料庫。
- 此段記錄第 0 階段原決策；安裝、資料庫與環境設定已在 v2 第 1 階段完成。

#### 2. 雲端 PostgreSQL

- 雲端 PostgreSQL 供應商維持待決策，第 0 階段不指定供應商。
- 開發期間使用本機 PostgreSQL。
- v2 第 9 階段再比較 Neon、Supabase、Prisma Postgres 或其他託管 PostgreSQL。
- 屆時依免費額度、連線限制、Vercel 相容性與維護成本決定。

#### 3. Auth

- 採用 Better Auth。
- 第二版只實作 Email／Password 註冊、登入與登出。
- 不做 OAuth、Email 驗證、忘記密碼與 2FA。

#### 4. Session

- 採用資料庫 Session。
- 所有受保護頁面與資料操作都必須在伺服器端驗證 Session。
- 不能只因 Cookie 存在就視為已登入。

#### 5. 密碼雜湊

- 使用 Better Auth 預設密碼雜湊方案。
- 不自行另外實作 SHA-256、bcrypt、Argon2id 或第二層雜湊。
- 資料庫不得保存明文密碼。
- 密碼、密碼雜湊與驗證資訊不得寫入 `AuditLog`、console、README、Notion 或 Git Repository。

#### 6. 輸入驗證

- 採用 Zod 穩定版，作為執行時輸入驗證工具。
- 前端驗證用於改善使用體驗。
- 伺服器端 Zod 驗證才是資料進入業務邏輯與資料庫前的必要檢查。
- 不以 TypeScript、HTML `required` 或 Prisma 取代伺服器端驗證。

#### 7. Server Components、Server Actions 與 Route Handlers 分工

- Server Components：讀取頁面資料。
- Server Actions：處理網站內部表單與 CRUD 資料異動。
- Route Handlers：處理 Better Auth 所需 API 與真正需要 HTTP API 的功能。
- 不重複建立一套 `/api/records` CRUD。
- Server Action 與 Route Handler 都必須驗證 Session 與必要輸入。

#### 8. 測試策略

- 每個開發階段都執行人工驗證。
- 每個階段執行 `npm.cmd run lint` 與 `npm.cmd run build`。
- 單元測試與整合／流程測試為主，隨後續功能階段逐步加入。
- v2 第 8 階段規劃採 Vitest 測試 Zod Schema 與純邏輯。
- v2 第 8 階段規劃採 Playwright 測試註冊、登入、CRUD 與越權情境。
- 不以覆蓋率數字為主要目標，優先測試登入、資料異動與使用者資料隔離。

#### 9. 機密資料與 Git 安全規則

- 原規劃以本機環境檔保存機密；Prisma 7 實際採 `.env` 搭配 `prisma.config.ts` 載入 `DATABASE_URL`，`.env` 不得提交 Git。
- Repository 只提供不含真實值的 `.env.example`。
- 正式環境機密存放於 Vercel Environment Variables。
- 每次新增環境設定後，確認 `git status` 與 `git check-ignore`。
- `userId` 只能由伺服器根據 Session 決定，不接受前端指定；ownership／owner 僅用來描述資料擁有權概念。
- 查看、修改、刪除資料時，必須在伺服器端同時使用 `recordId` 與目前登入者的 `userId` 執行授權查詢。
- 錯誤訊息不得洩漏帳號存在狀態、SQL、stack trace、系統路徑或其他內部資訊。
- `AuditLog` 不記錄密碼、密碼雜湊、Session Token、Cookie、完整連線字串或其他機密。
- 專案只使用虛構資料，不保存真實敏感個資。

## 7. 頁面規劃

| 預計路徑 | 用途 | 存取限制 |
| --- | --- | --- |
| `/` | 系統名稱、用途說明及登入／註冊入口 | 公開 |
| `/register` | 註冊帳號 | 未登入使用者 |
| `/login` | 登入 | 未登入使用者 |
| `/records` | 新增自己的資料與查看自己的資料列表；新增表單直接整合於此頁 | 需登入 |
| `/records/[id]` | 查看單筆資料 | 僅資料擁有者 |
| `/records/[id]/edit` | 修改資料 | 僅資料擁有者 |
| `/activity` | 查看自己的操作紀錄 | 需登入 |

第一版 v1 只建立 `/` 首頁。登入與註冊只顯示無功能的預留按鈕，不建立對應頁面或驗證流程。其餘路徑屬於第二版 v2 MVP。

v2 第 2 階段完成當時，`/records` 僅作為驗證登入狀態的 Protected Page；v2 第 3 階段已將該頁擴充為使用 `new-record-form.tsx` 新增 Record，以及顯示目前登入使用者限定的 Record 列表。實際未建立 `/records/new`，其餘資料管理頁面仍留待後續階段。

## 8. 第二版 v2 資料模型

### 第 0 階段概念草圖

以下是 v2 第 0 階段的概念設計，用來描述預期領域資料與安全方向，不代表目前 Prisma Schema 的逐欄實作。v2 第 1 階段已依當時需求建立初始 Schema；兩者差異記錄於本節後段。

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
| `ownerId` | 第 0 階段概念名稱，表示紀錄擁有者並對應 `User.id`；目前實際 Prisma 欄位為 `Record.userId` |
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

概念上的 `AuditLog` 預計涵蓋建立、修改、刪除，以及登入或其他重要安全事件；實際記錄範圍會在對應功能階段確認。

### 第 1 階段初始 Schema 與第 2 階段 Auth 整合後實際 Schema

v2 第 1 階段的初始 Schema 曾建立 `User.password` 及 `User`、`Record`、`AuditLog` 三個應用模型。v2 第 2 階段依 Better Auth 1.6.27 官方資料模型完成 Auth 整合後，目前 [Prisma Schema](prisma/schema.prisma) 的實際狀態如下：

#### `User`（目前實際）

- `id`
- `name`
- `email`
- `emailVerified`
- `image`
- `createdAt`
- `updatedAt`
- `records`
- `auditLogs`
- `sessions`
- `accounts`

第 1 階段初始欄位 `User.password` 已移除。Email／Password credential 的密碼 hash 改由 Better Auth 儲存於 `Account.password`，不保存明文密碼。

#### Better Auth Models（目前實際）

- `Session`：Better Auth Database Session Model，包含唯一 Session Token、到期時間、使用者關聯及必要 client 資訊欄位；實際 PostgreSQL Table 為 `session`。
- `Account`：Better Auth Account Model；Email／Password 使用 `providerId = credential`，credential hash 儲存於 `Account.password`；實際 PostgreSQL Table 為 `account`。
- `Verification`：Better Auth Verification Model；實際 PostgreSQL Table 為 `verification`。

#### `Record` 與 `AuditLog`（目前實際）

- `Record` 目前包含 `id`、`title`、`content`、`createdAt`、`updatedAt`、`userId` 與 `user`。
- `AuditLog` 目前包含 `id`、`action`、`target`、`createdAt`、`userId` 與 `user`。
- `User -> Record` 與 `User -> AuditLog` 一對多關係均完整保留，使用 `userId` Foreign Key 並設定 `onDelete: Cascade`。

概念草圖與實際 Schema 仍有刻意保留的差異：`PersonalRecord` 實際命名為 `Record`，欄位由概念上的 `displayName`／`email`／`phone`／`note` 簡化為 `title`／`content`；`AuditLog` 目前仍使用 `action`／`target`，尚未加入概念草圖中的 `recordId`／`details`。這些後續資料模型調整不屬於 v2 第 2 階段。

#### Auth Migration 與目前 Tables

- 初始 Migration `20260810110544_init` 保持原狀，未被修改或刪除。
- v2 第 2 階段新增並成功套用 `20260812070058_add_auth` Migration。
- `prisma migrate status` 已確認 2 個 Migration 均已套用，資料庫 Schema 為最新。
- pgAdmin 已確認目前存在 7 張 Tables：`User`、`Record`、`AuditLog`、`account`、`session`、`verification`、`_prisma_migrations`。

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

第二版 v2 已進入開發流程，v2 第 0～4 階段已完成，v2 第 5 階段尚未開始。以下階段必須依序進行；每階段開始前先說明目的，完成後記錄修改檔案、主要程式碼、啟動方式與測試結果。

### v2 第 0 階段：確認待決策事項與安全邊界

狀態：**已完成**（2026-08-07）。

完成結果：

- 已決定採 PostgreSQL 與 Prisma，開發期間使用 Windows 本機 PostgreSQL，正式環境不依賴本機 `localhost`。
- 已決定使用 Better Auth、資料庫 Session 與 Better Auth 預設密碼雜湊方案。
- 已決定使用 Zod 穩定版，並確定前端與伺服器端驗證責任。
- 已決定 Server Components、Server Actions 與 Route Handlers 的責任分工。
- 已決定以單元與整合／流程測試為主，每階段執行人工驗證、lint、build，後續再逐步加入測試。
- 已完成 `User`、`Record`／`PersonalRecord` 與 `AuditLog` 的概念草圖及資料擁有權方向。
- 已記錄機密資料、Git、資料擁有權、錯誤訊息與 `AuditLog` 安全規則。
- 雲端 PostgreSQL 供應商仍為待決策，延至 v2 第 9 階段評估。
- 已建立並推送 Git tag `v2-stage-0`，指向 commit `aca8047b64d9da396a424068c21d9c7a585e1a08`。

### v2 第 1 階段：PostgreSQL 與 Prisma 基礎

狀態：**已完成**（2026-08-12）。

完成結果：

- Windows 本機已安裝 PostgreSQL 18.4、pgAdmin 4 與 Command Line Tools；安裝位置為 `D:\PostgreSQL\18`，Data Directory 為 `D:\PostgreSQL\18\data`，服務 `postgresql-x64-18` 使用預設 Port `5432` 並正常執行。
- 已使用 `postgres` 帳號完成連線，建立本機開發資料庫 `personal_data_management_dev`，並可由 pgAdmin 查看與管理。
- 已安裝 Prisma 7.9.1、`@prisma/client`、`@prisma/adapter-pg`、`pg`、`@types/pg`、`dotenv` 與 `tsx`。
- 已執行 Prisma 初始化，建立 `prisma/schema.prisma`、`prisma.config.ts` 與本機 `.env`。
- Prisma 7 實際使用 `.env` 搭配 `prisma.config.ts` 載入 `DATABASE_URL`，未採原規劃的 `.env.local`。
- 已建立不含真實密碼的 `.env.example`；`.gitignore` 使用 `.env*` 與 `!.env.example`，實測 `.env` 會被忽略、`.env.example` 可被追蹤，且 `git status` 不會顯示真實 `.env`。
- 已建立 `User`、`Record`、`AuditLog` 初始 Schema；關係使用 `userId` Foreign Key 與 `onDelete: Cascade`。
- `npx prisma db pull` 曾回報 `P4001: The introspected database was empty`；這表示當時連線成功但資料庫尚無 Table，並非 PostgreSQL 連線失敗。
- 已成功執行 `npx prisma format`。
- 已成功執行 `npx prisma migrate dev --name init`，建立 `prisma/migrations/20260810110544_init/migration.sql` 並套用資料庫。
- pgAdmin 已確認 `User`、`Record`、`AuditLog` 與 `_prisma_migrations` Tables 存在。
- 已成功執行 `npx prisma generate`，將 Prisma Client 產生至 `src/generated/prisma`。
- 已建立 `src/lib/prisma.ts`，使用 `PrismaClient`、`PrismaPg`、`DATABASE_URL` 與 `globalThis` singleton，避免 Next.js 開發環境 Hot Reload 重複建立大量連線。
- 第 1 階段驗收時重新執行 `prisma validate` 成功；當時 `prisma migrate status` 找到 1 個 Migration 且 Database Schema 已是最新。第 2 階段加入 Auth Migration 後，目前共有 2 個 Migration 且均已套用。
- `npm.cmd run lint` 與 `npm.cmd run build` 已於 2026-08-12 再次通過；Next.js Production Build 正常。
- 已建立並推送 Git tag `v2-stage-1`，指向 commit `923978164e1a333cfc5eb54024e18b1374f3e9e6`，tag 訊息為「完成 v2 第 1 階段 PostgreSQL 與 Prisma 基礎」。

#### npm 安全性處理紀錄

- 套件安裝後曾有 6 個 high severity vulnerabilities。
- 已執行 `npm audit` 與非破壞性的 `npm audit fix`，未使用 `npm audit fix --force`，避免未評估的 major／dependency range 變更造成相容性問題。
- 已審核並允許必要 install scripts：`@prisma/engines`、`prisma`、`esbuild`、`sharp`、`unrs-resolver`。
- 2026-08-12 重新執行 `npm audit`，目前仍有 3 個 high severity vulnerabilities，來源為 Next.js 依賴的 PostCSS 與 sharp；此風險已記錄，後續正常套件更新時重新檢查，不阻塞第 1 階段完成。
- v2 第 2 階段安裝 Better Auth 1.6.27 與 `@better-auth/prisma-adapter` 1.6.27 後，既有 3 個 high severity vulnerabilities 仍維持已記錄狀態；未使用 `npm audit fix --force`。

#### Vercel Deployment Debug 紀錄

- 第一次推送 Prisma 基礎後，Vercel Production Build 曾失敗，錯誤為 `Cannot find module '@/generated/prisma/client'`。
- 原因是本機曾手動執行 `prisma generate`，但 Vercel 使用乾淨 Build Environment，初始安裝流程沒有產生被 Git 忽略的 Prisma Client。
- 已在 `package.json` 新增 `"postinstall": "prisma generate"`，使部署流程在 `npm install` 後先產生 Prisma Client，再執行 build。
- 重新推送後，Vercel Build Logs 已確認 Prisma Client 產生、編譯成功、Build Completed 與 Deployment completed。
- 2026-08-12 再次開啟公開網址 `https://personal-data-management.vercel.app`，回應 HTTP 200 且首頁正常顯示。

### v2 第 2 階段：註冊、登入與登出

狀態：**已完成**（2026-08-12）。

完成結果：

- 已安裝並整合 Better Auth 1.6.27 與 `@better-auth/prisma-adapter` 1.6.27，沿用 `src/lib/prisma.ts` 的共用 Prisma Client 連接 PostgreSQL。
- 已啟用 Email／Password 註冊、登入與登出，並使用 Better Auth 預設密碼雜湊方案；未自行增加 SHA-256、bcrypt、Argon2 或第二層雜湊。
- 已完成 Database Session；Session 儲存於 PostgreSQL `session` Table。Cookie 只作為 Session Token 載體，伺服器使用 `auth.api.getSession({ headers })` 驗證 Session 是否有效。
- 已新增 `src/lib/auth.ts` 作為 Better Auth Server 設定、`src/lib/auth-client.ts` 作為 Browser Client，以及 `src/lib/session.ts` 共用伺服器端 Session 取得與保護邏輯。
- 已新增 Better Auth Route Handler `src/app/api/auth/[...all]/route.ts`，本階段未建立 `/api/records` 或其他 Record CRUD API。
- 已新增 `/register`、`/login`，以及作為最小 Protected Page 的 `/records`。
- `/records` 未登入時會 redirect 至 `/login`；登入後由 Server Component 驗證 Database Session。第 2 階段完成當時該頁只作為 Session 驗證入口，尚未查詢或建立 Record；Record 新增與列表已於第 3 階段完成。
- 登入與註冊頁面均已加入顯示／隱藏密碼按鈕及固定導向 `/` 的返回首頁連結。
- 已完成正常註冊、重複 Email、正確登入、錯誤密碼、不存在帳號、未登入直接存取 `/records`、登出及登出後再次存取等人工驗證。
- 已確認 User 與 credential Account 會寫入 PostgreSQL，`accountId`、`providerId`、`userId` 與關聯符合 Better Auth 需求。
- 已確認 credential 密碼只保存 Better Auth hash 於 `Account.password`，不保存明文；登出後 Database Session 會清除。
- `prisma validate`、`prisma migrate status`、`npm.cmd run lint` 與 `npm.cmd run build` 均已通過。

#### Auth 人工驗收 Debug 紀錄

- 人工驗收時，一個既有虛構測試帳號曾出現註冊後可使用自動建立的 Session，但登出後無法以預期測試密碼重新登入。
- 直接使用 Better Auth 1.6.27 原生 `verifyPassword` 驗證後，確認該單筆舊 credential hash 與預期測試密碼不相符。
- Account 結構、Prisma Schema、Database Session、Node.js 與 Prisma Adapter 均已排除為系統性原因。
- 使用 Better Auth 原生 `hashPassword` 修復該單筆虛構 credential 後，重新登入與 `/records` Server Session 驗證成功。
- 另以全新虛構帳號完成 sign-up → sign-out → sign-in → Protected Page → sign-out 流程，確認目前 Auth 流程正常。
- Debug 臨時 scripts 與測試暫存檔均已刪除，未納入 Git；文件不記錄測試密碼、完整 hash、Session Token 或其他機密。

#### Vercel 範圍說明

- 本階段只確認本機 production build 成功。
- 正式環境尚未配置可供 Auth 使用的雲端 PostgreSQL，因此未將 v2 第 2 階段 Production Auth／Database 驗證標記為完成。
- 雲端 PostgreSQL 供應商決策與正式 Auth 驗證仍留待 v2 第 9 階段，不提前導入任何供應商。

### v2 第 3 階段：新增與列表

狀態：**已完成**（2026-08-14）。

完成結果：

- 沿用既有 `Record.title`、`Record.content`、`Record.userId` 與 `User -> Record[]` 關聯，未修改 Prisma Schema、未新增或修改 Migration。
- 新增 `src/app/records/actions.ts`，以 Server Action 處理 Record 建立；每次操作都先呼叫 `requireServerSession()`，並只使用 `session.user.id` 寫入 `Record.userId`，不接受 Form、URL 或 Client 提供使用者 ID。
- 新增 `src/app/records/new-record-form.tsx`，使用 React `useActionState` 顯示送出中、成功與錯誤狀態；成功後清空表單，未建立重複的 `/api/records` API。
- Server Action 對不受信任的 `FormData` 執行第 3 階段最小伺服器端驗證：`title` 與 `content` 必須是字串、標題 trim 後不可為空、標題最多 120 字元、內容最多 2,000 字元。HTML `required`／`maxLength` 僅作為 UX 補充；完整 Zod Schema 仍留待第 7 階段。
- `/records` 維持 Server Component，先以 `requireServerSession()` 驗證 Database Session，再由 Prisma 使用 `where: { userId: session.user.id }` 在 Database Query 層限制資料範圍，並依 `createdAt` 由新到舊排列。
- 列表已顯示 Record 標題、內容與建立時間；沒有資料時顯示「目前還沒有資料。」。
- 人工驗收使用兩個全新虛構帳號：User A 建立 A1 後可看到 A1；User B 登入後看不到 A1、建立 B1 後只看到 B1；User A 重新登入後仍看到 A1且看不到 B1。另由 Prisma 查詢確認 A1／B1 的 `userId` 均與各自 User ID 相符。
- 已確認空白標題會被 Server Action 拒絕；登出後直接存取 `/records` 會 redirect 至 `/login`。
- 驗收用虛構帳號與 Record 已於確認結果後清理，未建立或保留臨時 debug script。
- `prisma validate`、`prisma migrate status`、`npm.cmd run lint`、`npm.cmd run build` 與 `git diff --check` 均已通過。
- 本階段只完成 Record 新增與目前使用者列表；Record 詳細頁、修改、刪除、完整 ID 型越權測試、AuditLog、Zod、Vitest 與 Playwright 均未開始。

原完成條件：

- 登入者可新增經驗證的虛構資料紀錄。
- 列表只顯示目前登入者的資料。
- 重新整理與重新登入後資料仍存在。

### v2 第 4 階段：查看、修改與刪除

狀態：**已完成**（2026-08-14）。

完成結果：

- 新增 `/records/[id]` 詳細頁，顯示 Record 的 `title`、`content`、`createdAt` 與 `updatedAt`，並提供返回列表、前往修改與刪除操作。
- 新增 `/records/[id]/edit` 修改頁與 `edit-record-form.tsx`；頁面會載入既有 `title`／`content`，並以 Server Action 處理修改。
- 新增 `delete-record-button.tsx`，使用瀏覽器原生 `window.confirm()` 在送出 Delete Server Action 前確認；取消時不會刪除資料。
- 新增統一 `not-found.tsx`；Record 不存在或不屬於目前使用者時，只顯示「資料可能不存在，或目前登入帳號無權存取」的一般化訊息，不洩漏其他使用者或內部資訊。
- 詳細頁與修改頁均為 Server Component，先使用 `requireServerSession()` 驗證有效 Database Session，再以 `recordId + session.user.id` 查詢目前登入使用者的單筆 Record。
- Update Server Action 使用 `updateMany` 並同時限制 `id: recordId` 與 `userId: session.user.id`；Delete Server Action 使用 `deleteMany` 並採相同條件，`userId` 不接受 Client、URL 或 Form 指定。
- 修改沿用第 3 階段最小 Server-side validation：`title`／`content` 必須是字串、標題 trim 後不可為空、標題最多 120 字元、內容最多 2,000 字元；HTML 驗證只作為 UX 補充，Zod 仍留待第 7 階段。
- 修改成功會顯示「資料已更新」；驗證、授權或資料庫操作失敗會顯示安全的一般化錯誤；刪除成功後返回 `/records` 並顯示「資料已刪除」。
- 使用者本人已完成人工驗收：詳細頁欄位、修改預填與儲存、`updatedAt` 更新、空白標題拒絕、刪除取消／確認、刪除成功提示、Not Found 與登出後登入保護流程均通過。
- Prisma Schema 未修改，沒有新增或修改 Migration；未安裝 Zod、未實作 `AuditLog`、未建立 `/api/records` CRUD。
- `prisma validate`、`prisma migrate status`、`npm.cmd run lint`、`npm.cmd run build` 與 `git diff --check` 均已通過。
- 完整跨帳號竄改 Record ID 的查看、修改、刪除越權測試仍保留至 v2 第 5 階段；第 5 階段尚未開始。

原完成條件：

- 可查看、修改及刪除自己的紀錄。
- 刪除前需要確認。
- 成功與失敗狀態都有清楚提示。

### v2 第 5 階段：使用者資料隔離

完成條件：

- 所有資料操作都在伺服器端檢查目前登入使用者的 `userId`；ownership／owner 只表示資料擁有權概念。
- 竄改網址或紀錄 ID 不能查看、修改或刪除其他使用者資料。
- 越權情境具有可重複測試步驟。

### v2 第 6 階段：操作紀錄

完成條件：

- 新增、修改與刪除會建立 `AuditLog`。
- 操作紀錄不包含密碼或完整敏感資料。
- 登入者可查看自己的必要操作紀錄。

### v2 第 7 階段：輸入驗證與錯誤處理

完成條件：

- 使用 Zod 穩定版建立執行時驗證 Schema。
- 主要欄位具有前端提示，並在伺服器端以 Zod 執行必要驗證。
- 不以 TypeScript、HTML `required` 或 Prisma 取代伺服器端驗證。
- 常見錯誤有一致且不洩漏系統細節的訊息。
- 操作成功、驗證失敗、查無資料及無權存取均有清楚提示。

### v2 第 8 階段：測試

完成條件：

- 使用 Vitest 測試 Zod Schema 與純邏輯。
- 使用 Playwright 測試註冊、登入、CRUD 與越權情境。
- 不以覆蓋率數字為主要目標，優先覆蓋登入、資料異動與使用者資料隔離。
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

更新日期：2026-08-14（Asia/Taipei）

| 版本 | 狀態 | 說明 |
| --- | --- | --- |
| 第一版 v1 | 已完成 | Next.js 骨架、首頁、lint、build、GitHub 首次推送、本機與遠端同步、Vercel Production Deployment 及公開首頁 smoke test 均已完成。 |
| 第二版 v2 | 開發中 | v2 第 0 階段技術決策與安全邊界、第 1 階段 PostgreSQL 與 Prisma 基礎、第 2 階段 Better Auth 與 Database Session、第 3 階段 Record 新增與列表、第 4 階段 Record 查看、修改與刪除均已完成；v2 第 5 階段尚未開始。 |

### 環境檢查紀錄

- 工作區：`D:\Projects\動態網站`
- 專案路徑：`D:\Projects\動態網站\personal-data-management`
- Node.js：`v24.18.0`
- npm：`11.16.0`；PowerShell 執行原則會攔截 `npm.ps1`，因此使用 `npm.cmd` 與 `npx.cmd`，未修改系統安全設定。
- Git：`2.55.0.windows.3`
- Visual Studio Code：`1.132.0`
- Next.js：`16.2.11`
- React／React DOM：`19.2.4`
- TypeScript：`5.9.3`（`package.json` 宣告 `^5`）
- ESLint：`9.39.5`（`package.json` 宣告 `^9`）
- Tailwind CSS：`4.3.2`（`package.json` 宣告 `^4`）
- PostgreSQL：`18.4`，Windows 服務 `postgresql-x64-18` 正常執行，Port `5432`。
- PostgreSQL 安裝位置：`D:\PostgreSQL\18`；Data Directory：`D:\PostgreSQL\18\data`。
- Prisma CLI／Client／PostgreSQL Adapter：`7.9.1`。
- Better Auth：`1.6.27`。
- `@better-auth/prisma-adapter`：`1.6.27`。
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

### 第二版 v2 第 0～4 階段 Git 與部署狀態

- v2 第 2 階段正式收尾完成後，`main` 與 `origin/main` 同步，並以 annotated tag `v2-stage-2` 標記 Better Auth 與 Database Session 完成狀態。
- tag `v2-stage-0` 指向 commit `aca8047b64d9da396a424068c21d9c7a585e1a08`，訊息為「完成 v2 第 0 階段技術決策與安全邊界」。
- tag `v2-stage-1` 指向 commit `923978164e1a333cfc5eb54024e18b1374f3e9e6`，訊息為「完成 v2 第 1 階段 PostgreSQL 與 Prisma 基礎」。
- tag `v2-stage-2` 訊息為「完成 v2 第 2 階段 Better Auth 與 Database Session」。
- v2 第 3 階段以 annotated tag `v2-stage-3` 標記 Record 新增與列表完成狀態，並於本階段收尾推送至遠端。
- v2 第 4 階段以 annotated tag `v2-stage-4` 標記 Record 查看、修改與刪除完成狀態，並於本階段收尾推送至遠端。
- Vercel Production 已在加入 `postinstall` 修正後成功完成乾淨建置與部署。
- 2026-08-12 公開網址再次驗證為 HTTP 200，首頁正常顯示。
- v2 第 2 階段 production build 已在本機通過；正式環境 Auth 尚未配置雲端 PostgreSQL，因此 Production Auth／Database 流程尚未驗證，保留至 v2 第 9 階段。

### 第二版 v2 階段狀態

| 階段 | 狀態 | 已完成／下一步 |
| --- | --- | --- |
| v2 第 0 階段 | 已完成 | 技術選型、安全邊界、概念資料模型、權限原則與開發順序已確認；tag `v2-stage-0` 已建立並推送。 |
| v2 第 1 階段 | 已完成 | PostgreSQL、Prisma、初始 Schema／Migration、Prisma Client、共用 Client、環境變數與 Git 安全、lint／build、Vercel Production 驗證均完成；tag `v2-stage-1` 已建立並推送。 |
| v2 第 2 階段 | 已完成 | Better Auth、Prisma Adapter、Auth Schema／Migration、Database Session、註冊、登入、登出、最小 Protected Page、人工驗證及 lint／build 均完成；tag `v2-stage-2` 已建立並推送。 |
| v2 第 3 階段 | 已完成 | Record Server Action 新增、目前使用者限定列表、最小伺服器端驗證、A／B 資料隔離人工驗收及 lint／build 均完成；tag `v2-stage-3` 於本階段收尾建立並推送。 |
| v2 第 4 階段 | 已完成 | Record 詳細頁、修改頁、Update／Delete Server Actions、刪除確認、統一 Not Found、成功／失敗狀態、人工驗收及 lint／build 均完成；tag `v2-stage-4` 於本階段收尾建立並推送。 |
| v2 第 5 階段 | 尚未開始 | 完整跨帳號 Record ID 越權測試與可重複測試步驟尚未執行。 |

### 第二版 v2 尚未完成項目

- Zod 尚未安裝，完整伺服器端輸入驗證與一致錯誤處理留待 v2 第 7 階段。
- Record 新增、列表、詳細頁、修改與刪除已完成，所有目前操作均使用 Server Session 的 `userId`；完整跨帳號 Record ID 越權測試與可重複測試步驟仍留待 v2 第 5 階段。
- `AuditLog` 實際操作紀錄尚未實作。
- Vitest 與 Playwright 尚未安裝或建立測試，留待 v2 第 8 階段。
- 雲端 PostgreSQL 供應商仍為待決策，正式環境 Auth／Database 驗證預定於 v2 第 9 階段處理。

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
| 2026-08-07 | 本機開發採 Windows 直接安裝 PostgreSQL | 開發期間搭配 pgAdmin 與 Command Line Tools，資料庫預計命名為 `personal_data_management_dev`，資料目錄優先放在 D 槽；正式環境不連本機資料庫。 |
| 2026-08-07 | 雲端 PostgreSQL 供應商維持待決策 | v2 第 9 階段再依免費額度、連線限制、Vercel 相容性與維護成本比較 Neon、Supabase、Prisma Postgres 或其他方案。 |
| 2026-08-07 | 帳號驗證採 Better Auth | 第二版只實作 Email／Password 註冊、登入與登出，不做 OAuth、Email 驗證、忘記密碼或 2FA。 |
| 2026-08-07 | Session 採資料庫 Session | 所有受保護頁面與資料操作都在伺服器端驗證 Session，不能只因 Cookie 存在就視為已登入。 |
| 2026-08-07 | 密碼雜湊採 Better Auth 預設方案 | 不自行實作 SHA-256、bcrypt、Argon2id 或第二層雜湊，且不保存或記錄明文密碼與驗證機密。 |
| 2026-08-07 | 輸入驗證採 Zod 穩定版 | 前端驗證改善體驗，伺服器端 Zod 驗證是進入業務邏輯與資料庫前的必要檢查。 |
| 2026-08-07 | 確定 Server Components、Server Actions 與 Route Handlers 分工 | Server Components 負責讀取，Server Actions 負責網站內部異動，Route Handlers 只處理 Better Auth 與必要 HTTP API，不建立重複的 `/api/records` CRUD。 |
| 2026-08-07 | 測試採階段性人工驗證、Vitest 與 Playwright | 每階段執行人工驗證、lint、build；v2 第 8 階段以 Vitest 測試 Schema／純邏輯，以 Playwright 測試主要流程與越權情境。 |
| 2026-08-07 | 確定機密資料與 Git 安全規則 | 本機機密不得提交 Git、Repository 只提供無真實值的 `.env.example`、正式機密放 Vercel Environment Variables，並落實資料擁有權及錯誤訊息安全；實際環境檔格式於第 1 階段依 Prisma 7 確認。 |
| 2026-08-12 | v2 第 1 階段採 PostgreSQL 18.4 與 Prisma 7.9.1 完成落地 | 已建立本機開發資料庫、初始 Schema、Migration、Prisma Client 與共用 singleton Client，並以 Prisma migration status 確認資料庫為最新。 |
| 2026-08-12 | Prisma 7 本機環境採 `.env` 與 `prisma.config.ts` | 這是目前實際實作；`.env` 受 Git 忽略，Repository 僅追蹤不含真實值的 `.env.example`，不強制改回原規劃的 `.env.local`。 |
| 2026-08-12 | Vercel 安裝流程加入 `postinstall: prisma generate` | Prisma Client 產物受 Git 忽略，乾淨部署環境必須在安裝後自動產生，避免 `Cannot find module '@/generated/prisma/client'`。 |
| 2026-08-12 | 保留 3 個已記錄的 high severity audit 風險 | 已執行非破壞性 `npm audit fix`，未使用 `--force`；後續正常套件更新時再評估 PostCSS 與 sharp 上游修正。 |
| 2026-08-12 | v2 第 1 階段標記為完成 | lint、build、Prisma validate、migration status、Git 同步、tag 與 Vercel Production 均已驗證；Better Auth 當時留待第 2 階段。 |
| 2026-08-12 | Better Auth 採 1.6.27 並使用 Prisma Adapter | 以 `@better-auth/prisma-adapter` 連接既有 Prisma Client 與 PostgreSQL，完成 Email／Password 註冊、登入與登出。 |
| 2026-08-12 | v2 第 2 階段完成 Database Session 與伺服器端驗證 | Session 儲存於 PostgreSQL `session` Table；受保護頁面使用 `auth.api.getSession(...)` 驗證有效 Session，Cookie 存在本身不代表登入成功。 |
| 2026-08-12 | credential hash 改存於 `Account.password` | 依 Better Auth 官方模型移除 `User.password`，使用 Better Auth 預設 hash，不保存明文密碼，並保留 `User -> Record`、`User -> AuditLog` 關聯。 |
| 2026-08-12 | v2 第 2 階段標記為完成 | Auth Schema／Migration、註冊、登入、登出、最小 Protected Page、人工驗收、Prisma 檢查、lint 與 production build 均已完成；Record CRUD 留待第 3 階段。 |
| 2026-08-14 | v2 第 3 階段沿用既有 `Record.title`／`Record.content` | 既有 Schema 已足以完成新增與列表，因此不修改 Schema 或 Migration；Record owner 一律由 Server Action 的有效 Session 決定。 |
| 2026-08-14 | Record 讀寫在 Database Query 層依使用者隔離 | 建立時使用 `session.user.id` 寫入 `userId`，列表使用 `where: { userId: session.user.id }`；A／B 虛構帳號人工驗收與 Prisma ownership 查詢均通過。 |
| 2026-08-14 | v2 第 3 階段標記為完成 | Server Action、新增表單、目前使用者 Record 列表、最小伺服器端驗證、Prisma 檢查、lint、production build 與資料隔離驗收均已完成；詳細頁、修改與刪除留待第 4 階段。 |
| 2026-08-14 | v2 第 4 階段 Read／Update／Delete 均使用 `recordId + session.user.id` 授權 | 詳細與修改頁在 Server Component 讀取時同時限制 Record ID 與有效 Session 使用者；更新與刪除 Server Actions 以同一組條件執行 `updateMany`／`deleteMany`，不信任 Client 提供的 `userId`。 |
| 2026-08-14 | v2 第 4 階段標記為完成 | 詳細頁、修改頁、刪除確認、統一 Not Found、成功／失敗提示、人工驗收、Prisma 檢查、lint 與 production build 均已完成；完整跨帳號越權測試留待第 5 階段。 |

## 13. 測試、啟動與公開網址

目前 PowerShell 環境使用 `.cmd` 入口，避免 `npm.ps1` 受到執行原則攔截。

```powershell
node --version
npm.cmd --version
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
.\node_modules\.bin\prisma.cmd validate
.\node_modules\.bin\prisma.cmd migrate status
```

- 本機開發網址：`http://localhost:3000`
- 第一版 v1 公開網址：`https://personal-data-management.vercel.app`
