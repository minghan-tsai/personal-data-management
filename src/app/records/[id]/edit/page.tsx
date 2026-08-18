import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditRecordForm } from "@/app/records/[id]/edit/edit-record-form";
import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";
import { recordIdSchema } from "@/lib/validation/record";

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
  const parsedRecordId = recordIdSchema.safeParse(id);

  if (!parsedRecordId.success) {
    notFound();
  }

  const record = await prisma.record.findFirst({
    where: {
      id: parsedRecordId.data,
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
    <main className="page-shell-narrow">
      <section className="panel p-7 sm:p-9">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">修改紀錄</h1>
        <p className="page-description">
          儲存時會再次驗證登入狀態、輸入內容與資料擁有權。
        </p>
        <EditRecordForm record={record} />
      </section>
    </main>
  );
}
