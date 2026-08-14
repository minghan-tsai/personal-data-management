"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";

const TITLE_MAX_LENGTH = 120;
const CONTENT_MAX_LENGTH = 2000;

export type CreateRecordState = {
  status: "idle" | "error" | "success";
  message: string;
};

export async function createRecord(
  _previousState: CreateRecordState,
  formData: FormData,
): Promise<CreateRecordState> {
  const session = await requireServerSession();
  const titleValue = formData.get("title");
  const contentValue = formData.get("content");

  if (typeof titleValue !== "string" || typeof contentValue !== "string") {
    return {
      status: "error",
      message: "資料格式不正確，請重新輸入。",
    };
  }

  const title = titleValue.trim();
  const content = contentValue.trim();

  if (!title) {
    return {
      status: "error",
      message: "標題不可為空白。",
    };
  }

  if (title.length > TITLE_MAX_LENGTH) {
    return {
      status: "error",
      message: `標題不可超過 ${TITLE_MAX_LENGTH} 個字元。`,
    };
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    return {
      status: "error",
      message: `內容不可超過 ${CONTENT_MAX_LENGTH} 個字元。`,
    };
  }

  await prisma.record.create({
    data: {
      title,
      content: content || null,
      userId: session.user.id,
    },
  });

  revalidatePath("/records");

  return {
    status: "success",
    message: "資料已新增。",
  };
}
