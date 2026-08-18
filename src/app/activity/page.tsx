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

const actionStyles: Record<string, string> = {
  CREATE: "border-emerald-200 bg-emerald-50 text-emerald-800",
  UPDATE: "border-blue-200 bg-blue-50 text-blue-800",
  DELETE: "border-red-200 bg-red-50 text-red-800",
};

function formatAuditTarget(target: string | null) {
  const recordPrefix = "Record:";

  if (target?.startsWith(recordPrefix)) {
    return target.slice(recordPrefix.length);
  }

  return target ?? "未指定";
}

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
    <main className="page-shell">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-[2.75rem]">操作紀錄</h1>
          <p className="page-description">
            這裡只顯示目前登入帳號的資料建立、修改與刪除紀錄。
          </p>
        </div>
        <Link className="button button-secondary" href="/records">
          返回紀錄列表
        </Link>
      </header>

      <section className="panel p-6 sm:p-8">
        {activity.length === 0 ? (
          <div className="empty-state">
            <h2 className="font-bold text-slate-900">目前還沒有操作紀錄</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              新增、修改或刪除紀錄後，必要操作會依時間顯示在這裡。
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {activity.map((entry) => (
              <li className="py-5 first:pt-0 last:pb-0" key={entry.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${
                      actionStyles[entry.action] ?? "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {actionLabels[entry.action] ?? "其他操作"}
                  </p>
                  <time
                    className="text-xs text-slate-500 sm:text-sm"
                    dateTime={entry.createdAt.toISOString()}
                  >
                    {new Intl.DateTimeFormat("zh-TW", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Taipei",
                    }).format(entry.createdAt)}
                  </time>
                </div>
                <p className="mt-3 break-all text-sm font-medium text-slate-700">
                  紀錄 ID：{formatAuditTarget(entry.target)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
