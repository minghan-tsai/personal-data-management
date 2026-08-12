import type { Metadata } from "next";

import { LogoutButton } from "@/app/records/logout-button";
import { requireServerSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "受保護頁面｜個人資料管理系統",
};

export default async function RecordsPage() {
  const session = await requireServerSession();

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-12">
        <p className="text-sm font-semibold tracking-[0.18em] text-emerald-700">PROTECTED PAGE</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">登入驗證成功</h1>
        <p className="mt-5 leading-7 text-slate-600">
          歡迎，{session.user.name}。此頁面只會在伺服器端確認 Database Session 有效後顯示。
        </p>
        <p className="mt-2 text-sm text-slate-500">登入帳號：{session.user.email}</p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
          Record 新增、列表、修改與刪除功能尚未開始；本頁僅作為 v2 第 2 階段的 Session
          驗證入口。
        </div>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
