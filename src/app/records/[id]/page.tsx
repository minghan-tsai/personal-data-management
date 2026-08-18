import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DeleteRecordButton } from "@/app/records/[id]/delete-record-button";
import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";
import { recordIdSchema } from "@/lib/validation/record";

export const metadata: Metadata = {
  title: "資料詳細｜個人資料管理系統",
};

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("zh-TW", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Taipei",
  }).format(value);
}

export default async function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireServerSession();
  const { id } = await params;
  const parsedRecordId = recordIdSchema.safeParse(id);

  if (!parsedRecordId.success) {
    notFound();
  }

  const record = await prisma.record.findFirst({
    where: {
      id: parsedRecordId.data,
      userId: session.user.id,
    },
  });

  if (!record) {
    notFound();
  }

  return (
    <main className="page-shell-narrow">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link className="button button-secondary" href="/records">
          返回紀錄列表
        </Link>
        <Link className="button button-primary" href={`/records/${record.id}/edit`}>
          修改紀錄
        </Link>
      </div>

      <article className="panel overflow-hidden">
        <header className="border-b border-slate-200 p-7 sm:p-9">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">紀錄詳情</h1>
        </header>

        <div className="p-7 sm:p-9">
          <h2 className="break-words text-2xl font-bold tracking-tight text-slate-950">{record.title}</h2>
          <section aria-labelledby="record-content-title">
            <h3 className="mt-7 text-sm font-bold text-slate-500" id="record-content-title">
              內容
            </h3>
            <p className="mt-3 whitespace-pre-wrap break-words leading-8 text-slate-700">
            {record.content || "（無內容）"}
            </p>
          </section>

          <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-500">建立時間</dt>
              <dd className="mt-1.5 text-slate-800">
                <time dateTime={record.createdAt.toISOString()}>{formatDateTime(record.createdAt)}</time>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">最後更新</dt>
              <dd className="mt-1.5 text-slate-800">
                <time dateTime={record.updatedAt.toISOString()}>{formatDateTime(record.updatedAt)}</time>
              </dd>
            </div>
          </dl>
        </div>
      </article>

      <section className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <h2 className="font-bold text-red-950">刪除這筆紀錄</h2>
          <p className="mt-1 text-sm leading-6 text-red-800">此操作無法復原，送出前會再次要求確認。</p>
        </div>
        <div className="mt-4 shrink-0 sm:mt-0">
          <DeleteRecordButton recordId={record.id} />
        </div>
      </section>
    </main>
  );
}
