import type { Metadata } from "next";
import Link from "next/link";

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
    <main className="page-shell">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-[2.75rem]">我的紀錄</h1>
        <p className="page-description">
          新增並管理目前登入帳號專屬的個人紀錄；資料範圍由伺服器端 Session 控制。
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
          <span>
            登入者：<strong className="font-bold text-slate-700">{session.user.name}</strong>
          </span>
          <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
            ·
          </span>
          <span>{session.user.email}</span>
        </p>
      </header>

      {deleted === "1" ? (
        <p className="status-message status-success mb-6" role="status">
          資料已刪除。
        </p>
      ) : null}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.35fr)]">
        <section className="panel p-6 sm:p-8">
          <h2 className="section-title">新增紀錄</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            資料會由伺服器自動綁定目前登入帳號。
          </p>
          <NewRecordForm />
        </section>

        <section className="panel min-w-0 p-6 sm:p-8" aria-labelledby="record-list-title">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h2 className="section-title" id="record-list-title">
                紀錄列表
              </h2>
              <p className="mt-2 text-sm text-slate-500">依建立時間由新到舊排列。</p>
            </div>
            <p className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700">
              {records.length} 筆
            </p>
          </div>

          {records.length === 0 ? (
            <div className="empty-state mt-6">
              <h3 className="font-bold text-slate-900">目前還沒有紀錄</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                使用左側表單建立第一筆資料，建立後會立即出現在這裡。
              </p>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {records.map((record) => (
                <li
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
                  key={record.id}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-bold text-slate-950">{record.title}</h3>
                      <p className="mt-2 max-h-24 overflow-hidden whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                        {record.content || "（無內容）"}
                      </p>
                    </div>
                    <Link className="button button-secondary shrink-0" href={`/records/${record.id}`}>
                      查看詳細
                    </Link>
                  </div>
                  <time className="mt-4 block text-xs text-slate-500" dateTime={record.createdAt.toISOString()}>
                    建立於{" "}
                    {new Intl.DateTimeFormat("zh-TW", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Taipei",
                    }).format(record.createdAt)}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
