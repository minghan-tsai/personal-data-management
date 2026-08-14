import type { Metadata } from "next";
import Link from "next/link";

import { LogoutButton } from "@/app/records/logout-button";
import { NewRecordForm } from "@/app/records/new-record-form";
import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "資料列表｜個人資料管理系統",
};

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string | string[] }>;
}) {
  const session = await requireServerSession();
  const { deleted } = await searchParams;
  const records = await prisma.record.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-emerald-700">MY RECORDS</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">我的資料</h1>
              <p className="mt-4 leading-7 text-slate-600">
                歡迎你，{session.user.name}。這裡只會顯示目前登入帳號建立的資料。
              </p>
              <p className="mt-1 text-sm text-slate-500">登入 Email：{session.user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">新增資料</h2>
          <p className="mt-2 leading-7 text-slate-600">資料會由伺服器自動綁定目前登入帳號。</p>
          <NewRecordForm />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          {deleted === "1" ? (
            <p className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
              資料已刪除。
            </p>
          ) : null}

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">資料列表</h2>
              <p className="mt-2 text-sm text-slate-500">依建立時間由新到舊排列。</p>
            </div>
            <p className="text-sm font-semibold text-slate-600">共 {records.length} 筆</p>
          </div>

          {records.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-slate-50 px-5 py-8 text-center text-slate-600">
              目前還沒有資料。
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {records.map((record) => (
                <li className="rounded-2xl border border-slate-200 p-5" key={record.id}>
                  <h3 className="text-lg font-bold text-slate-950">
                    <Link className="transition hover:text-blue-700 hover:underline" href={`/records/${record.id}`}>
                      {record.title}
                    </Link>
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
                    {record.content || "（無內容）"}
                  </p>
                  <time
                    className="mt-4 block text-sm text-slate-500"
                    dateTime={record.createdAt.toISOString()}
                  >
                    建立時間：
                    {new Intl.DateTimeFormat("zh-TW", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Taipei",
                    }).format(record.createdAt)}
                  </time>
                  <Link
                    className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
                    href={`/records/${record.id}`}
                  >
                    查看詳細資料
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
