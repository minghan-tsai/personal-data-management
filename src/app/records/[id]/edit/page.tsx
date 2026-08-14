import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EditRecordForm } from "@/app/records/[id]/edit/edit-record-form";
import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "修改資料｜個人資料管理系統",
};

export default async function EditRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireServerSession();
  const { id } = await params;
  const record = await prisma.record.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  if (!record) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-12 sm:py-16">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
        <p className="text-sm font-semibold tracking-[0.18em] text-blue-700">EDIT RECORD</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">修改資料</h1>
        <p className="mt-4 leading-7 text-slate-600">
          儲存時會再次驗證登入狀態、輸入內容與資料擁有權。
        </p>
        <EditRecordForm record={record} />
        <Link className="mt-6 inline-block text-sm font-semibold text-blue-700 hover:underline" href="/records">
          返回資料列表
        </Link>
      </section>
    </main>
  );
}
