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
    <main className="min-h-screen px-6 py-12 sm:py-16">
      <article className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
        <p className="text-sm font-semibold tracking-[0.18em] text-emerald-700">RECORD DETAILS</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{record.title}</h1>

        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
          <h2 className="text-sm font-semibold text-slate-500">內容</h2>
          <p className="mt-3 whitespace-pre-wrap leading-8 text-slate-700">
            {record.content || "（無內容）"}
          </p>
        </div>

        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <dt className="font-semibold text-slate-500">建立時間</dt>
            <dd className="mt-2 text-slate-800">
              <time dateTime={record.createdAt.toISOString()}>{formatDateTime(record.createdAt)}</time>
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <dt className="font-semibold text-slate-500">最後更新</dt>
            <dd className="mt-2 text-slate-800">
              <time dateTime={record.updatedAt.toISOString()}>{formatDateTime(record.updatedAt)}</time>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-start">
          <Link
            className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
            href="/records"
          >
            返回資料列表
          </Link>
          <Link
            className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
            href={`/records/${record.id}/edit`}
          >
            修改資料
          </Link>
          <DeleteRecordButton recordId={record.id} />
        </div>
      </article>
    </main>
  );
}
