import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "操作紀錄｜個人資料管理系統",
};

const actionLabels: Record<string, string> = {
  CREATE: "建立資料",
  UPDATE: "修改資料",
  DELETE: "刪除資料",
};

export default async function ActivityPage() {
  const session = await requireServerSession();
  const activity = await prisma.auditLog.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      action: true,
      target: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-6 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <p className="text-sm font-semibold tracking-[0.18em] text-emerald-700">ACTIVITY</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">操作紀錄</h1>
          <p className="mt-4 leading-7 text-slate-600">
            這裡只顯示目前登入帳號的資料建立、修改與刪除紀錄。
          </p>
          <Link
            className="mt-6 inline-flex rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            href="/records"
          >
            返回資料列表
          </Link>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          {activity.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 px-5 py-8 text-center text-slate-600">
              目前還沒有操作紀錄。
            </p>
          ) : (
            <ul className="space-y-4">
              {activity.map((entry) => (
                <li className="rounded-2xl border border-slate-200 p-5" key={entry.id}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-bold text-slate-950">
                      {actionLabels[entry.action] ?? "其他操作"}
                    </p>
                    <time
                      className="text-sm text-slate-500"
                      dateTime={entry.createdAt.toISOString()}
                    >
                      {new Intl.DateTimeFormat("zh-TW", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Taipei",
                      }).format(entry.createdAt)}
                    </time>
                  </div>
                  <p className="mt-2 break-all text-sm text-slate-600">
                    操作目標：{entry.target ?? "未指定"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
