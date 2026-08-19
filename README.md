# Personal Data Management System

以 Next.js App Router 建立的個人紀錄管理系統，展示帳號驗證、資料存取授權、CRUD、操作紀錄、執行時輸入驗證、自動化測試與 CI。專案定位為金融業 IT／企業內部系統開發職缺的全端求職作品，所有示範與測試資料均為虛構資料。

> v2 第 0～10 階段已全部完成。本機使用 PostgreSQL 18，正式環境使用 Neon PostgreSQL，並已完成 Vercel Production Deployment、Auth／Database 流程與使用者資料隔離人工驗收。

## 主要功能

- Email／Password 註冊、登入與登出。
- Better Auth Database Session 與受保護路由。
- 個人 Record 新增、列表、查看、修改與刪除。
- 所有 Record 查詢與異動在伺服器端使用 `session.user.id` 驗證資料擁有權。
- CREATE／UPDATE／DELETE AuditLog 與使用者限定的 `/activity` 頁面。
- Zod runtime validation 與不洩漏內部資訊的錯誤處理。
- Vitest 單元測試、Playwright Chromium E2E 測試與 GitHub Actions CI。
- Vercel Git Integration 持續部署。

## 技術棧

| 類別 | 技術 |
| --- | --- |
| Web | Next.js 16、React 19、TypeScript、App Router、Server Components、Server Actions |
| UI | Tailwind CSS 4 |
| Auth | Better Auth 1.6、Email／Password、Database Session |
| Database | PostgreSQL 18、Prisma 7、`@prisma/adapter-pg` |
| Validation | Zod 4 |
| Testing | Vitest 4、Playwright 1.62（Chromium） |
| CI／CD | GitHub Actions CI、Vercel Git Integration CD |

## 系統流程與安全設計

```text
Browser
  → Next.js App Router
  → Better Auth / Server Actions
  → Server-side Session 與 Zod validation
  → Prisma transaction / ownership query
  → PostgreSQL
```

- Better Auth 將 credential 密碼以套件預設安全雜湊儲存在 `Account.password`，不保存明文密碼。
- Cookie 只承載 Session Token；受保護頁面與 Server Action 會在伺服器端驗證 Database Session。
- Client、URL、FormData 與 hidden input 均不能指定可信任的 `userId`。
- List 直接以目前使用者的 `userId` 查詢；Read／Edit／Update／Delete 同時限制 `recordId` 與 `session.user.id`。
- 查無資料與跨帳號存取使用相同的一般化 Not Found 呈現，避免洩漏資料是否存在或 owner 資訊。
- Record 異動與 AuditLog 寫入使用 Prisma transaction；失敗操作不會留下成功 Log。
- AuditLog 只記錄 action、`Record:<recordId>`、userId 與時間，不記錄內容、密碼、Session、Cookie 或連線字串。

## 主要資料模型

- `User`：Better Auth 使用者，關聯 Session、Account、Record 與 AuditLog。
- `Session`／`Account`／`Verification`：Better Auth 所需資料。
- `Record`：title、content、時間欄位與 `userId` ownership。
- `AuditLog`：CREATE／UPDATE／DELETE 的必要操作紀錄。

## 本機開發

### 前置需求

- Node.js 24
- npm 11
- PostgreSQL 18
- Git

### 1. 取得專案並安裝套件

```powershell
git clone https://github.com/minghan-tsai/personal-data-management.git
cd personal-data-management
npm.cmd ci
```

`postinstall` 會自動執行 `prisma generate`，產生受 Git 忽略的 Prisma Client。

### 2. 建立本機資料庫

在 PostgreSQL 建立開發資料庫：

```text
personal_data_management_dev
```

可使用 pgAdmin 或 PostgreSQL Command Line Tools 建立。請勿把正式資料或真實敏感個資放入此作品。

### 3. 設定環境變數

```powershell
Copy-Item .env.example .env
```

將 `.env` 的 placeholder 換成本機值。`.env` 已由 Git 忽略，不可提交。

| 變數 | 用途 | 本機範例方向 |
| --- | --- | --- |
| `DATABASE_URL` | Prisma／Better Auth 連線 PostgreSQL | 指向 `localhost:5432/personal_data_management_dev` |
| `BETTER_AUTH_SECRET` | Better Auth 簽章與安全用途 | 每個環境各自產生至少 32 字元的高熵值 |
| `BETTER_AUTH_URL` | Better Auth canonical base URL | `http://localhost:3000` |

可使用 Node.js 內建加密模組產生本機 Secret；產生後只放入 `.env` 或部署平台的機密設定：

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

### 4. 套用既有 migrations

```powershell
npm.cmd run db:migrate:deploy
```

此指令使用 `prisma migrate deploy`，適用於非互動環境與既有 migration 的部署。開發新 Schema 變更時才使用 `prisma migrate dev`；不要修改既有 migration，也不要用 `db push` 取代正式 migration history。

### 5. 啟動

```powershell
npm.cmd run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 品質檢查與測試

```powershell
npm.cmd run lint
npm.cmd run test
npm.cmd run build
npm.cmd run test:e2e
```

- Vitest：18 個 Record Zod Schema 單元測試。
- Playwright：3 個 Chromium E2E 流程，涵蓋 Protected Route、Authentication／CRUD／Activity 與 A／B 使用者資料隔離。
- Playwright 會透過 `webServer` 自動啟動測試用 Next.js server，並使用目前環境的 PostgreSQL；測試只建立唯一命名的虛構帳號與資料。
- GitHub Actions 在 `push` 與 `pull_request` 使用臨時 PostgreSQL 18 service，執行 Prisma migration、lint、Vitest、production build 與 Playwright。

## Vercel 正式環境部署

本專案使用 GitHub Repository 作為版本來源，Vercel Git Integration 負責安裝、Production Build 與 Deployment；GitHub Actions 只負責 CI，不另建重複的 Deployment Pipeline。

正式環境已完成下列設定：

- Vercel Project：`minghan-personal-data-management`。
- PostgreSQL：透過 Vercel Marketplace 建立的 Neon Production resource，Region 為 Singapore（Southeast），Plan 為 Free。
- Authentication：維持 Better Auth；未啟用 Neon Auth。
- Production Environment Variables：Neon Integration 已建立 `DATABASE_URL`、`DATABASE_URL_UNPOOLED` 等 Database 連線設定，另設 production 專用 `BETTER_AUTH_SECRET`，並將 `BETTER_AUTH_URL` 設為 `https://minghan-personal-data-management.vercel.app`；Repository 不包含任何實際 Secret 或 Database URL。
- Production migrations：使用 `npm.cmd run db:migrate:deploy` 套用 Repository 既有 migrations，並確認 Database Schema 為最新。
- Deployment：Vercel Git Integration 已完成 Production redeploy，狀態為 `Ready`。

日後部署新的既有 migration 時，仍使用 production database 的 direct 或 migration-compatible connection 執行：

```powershell
npm.cmd run db:migrate:deploy
```

不要在 Production 使用 `prisma migrate dev`、`prisma db push` 或 `prisma migrate reset`，也不要把 Database URL 寫入 Git 或命令紀錄。

Preview 若需要 Database／Auth，應使用獨立的 Preview database 與 Secret；不要把 Production database 暴露給未受控的 Preview deployment。沒有獨立 Preview database 時，僅將上述變數套用至 Production scope。

## 專案狀態

- v2 第 0～10 階段已全部完成。
- Production Register／Login／Logout、Protected Route、Record CRUD、AuditLog、A／B 帳號資料隔離與跨帳號一般化 Not Found 已通過人工驗收。
- 正式網址：[https://minghan-personal-data-management.vercel.app](https://minghan-personal-data-management.vercel.app)。
- 舊網址 [https://personal-data-management.vercel.app](https://personal-data-management.vercel.app) 已以 `308 Permanent Redirect` 導向新 canonical domain。

詳細階段紀錄請參閱 [PROJECT_PLAN.md](./PROJECT_PLAN.md)。

## 機密與測試資料規則

- Repository 只提供不含真實值的 `.env.example`。
- `.env`、Database password、Better Auth Secret、Session Token、Cookie 與 credential hash 不得提交。
- Vercel production 機密只存放在 Vercel Environment Variables。
- 文件、測試與畫面只使用虛構資料，不保存真實敏感個資。
