import Link from "next/link";

import { getServerSession } from "@/lib/session";

const features = [
  {
    title: "帳號與 Session",
    description: "使用 Email／密碼登入，透過伺服器端 Session 驗證身分。",
  },
  {
    title: "個人紀錄管理",
    description: "提供新增、查詢、修改與刪除的完整 CRUD 流程。",
  },
  {
    title: "資料隔離與授權",
    description: "每位使用者只能存取自己的資料。",
  },
  {
    title: "驗證與操作紀錄",
    description: "使用 Zod 驗證輸入，並保留重要操作紀錄。",
  },
];

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="page-shell">
      <section className="panel overflow-hidden">
        <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-center lg:p-14">
          <div>
            <p className="eyebrow">全端作品專案</p>
            <h1 className="page-title max-w-3xl">Personal Data Management System</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              安全管理個人紀錄，提供登入驗證、資料 CRUD、使用者資料隔離與操作紀錄。
            </p>
            <p className="mt-4 text-sm font-semibold tracking-wide text-slate-500">
              Next.js · PostgreSQL · Prisma · Better Auth
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {session ? (
                <Link className="button button-primary" href="/records">
                  前往我的紀錄
                </Link>
              ) : (
                <>
                  <Link className="button button-primary" href="/login">
                    登入系統
                  </Link>
                  <Link className="button button-secondary" href="/register">
                    建立測試帳號
                  </Link>
                </>
              )}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
            <p className="text-xs font-bold tracking-[0.14em] text-slate-500">系統概覽</p>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-sm font-semibold text-slate-500">用途</dt>
                <dd className="mt-1 font-bold text-slate-900">個人紀錄安全管理</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">核心技術</dt>
                <dd className="mt-1 font-bold text-slate-900">Next.js · PostgreSQL · Prisma</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-500">安全機制</dt>
                <dd className="mt-1 font-bold text-slate-900">
                  Session · Authorization · Data Isolation
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="capabilities-title">
        <div className="max-w-2xl">
          <p className="eyebrow">核心功能</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950" id="capabilities-title">
            從登入到資料安全的完整流程
          </h2>
          <p className="page-description">
            聚焦在完整資料流程與可驗證的安全控制，不增加非必要產品功能。
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article className="panel p-6" key={feature.title}>
              <p className="text-xs font-bold text-blue-700">0{index + 1}</p>
              <h3 className="mt-4 font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-slate-500">
          本作品僅使用虛構測試資料，不保存真實敏感個人資訊。
        </p>
      </section>
    </main>
  );
}
