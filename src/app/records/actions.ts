"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";

const TITLE_MAX_LENGTH = 120;
const CONTENT_MAX_LENGTH = 2000;

function getRecordAuditTarget(recordId: string) {
  return `Record:${recordId}`;
}

export type CreateRecordState = {
  status: "idle" | "error" | "success";
  message: string;
};

export type UpdateRecordState = CreateRecordState;
export type DeleteRecordState = CreateRecordState;

type RecordInputResult =
  | {
      data: {
        title: string;
        content: string | null;
      };
    }
  | {
      message: string;
    };

function validateRecordId(recordId: unknown) {
  if (typeof recordId !== "string") {
    return null;
  }

  const normalizedRecordId = recordId.trim();

  if (!normalizedRecordId || normalizedRecordId.length > 100) {
    return null;
  }

  return normalizedRecordId;
}

function validateRecordInput(formData: FormData): RecordInputResult {
  const titleValue = formData.get("title");
  const contentValue = formData.get("content");

  if (typeof titleValue !== "string" || typeof contentValue !== "string") {
    return {
      message: "資料格式不正確，請重新輸入。",
    };
  }

  const title = titleValue.trim();
  const content = contentValue.trim();

  if (!title) {
    return {
      message: "標題不可為空白。",
    };
  }

  if (title.length > TITLE_MAX_LENGTH) {
    return {
      message: `標題不可超過 ${TITLE_MAX_LENGTH} 個字元。`,
    };
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    return {
      message: `內容不可超過 ${CONTENT_MAX_LENGTH} 個字元。`,
    };
  }

  return {
    data: {
      title,
      content: content || null,
    },
  };
}

export async function createRecord(
  _previousState: CreateRecordState,
  formData: FormData,
): Promise<CreateRecordState> {
  const session = await requireServerSession();
  const input = validateRecordInput(formData);

  if ("message" in input) {
    return {
      status: "error",
      message: input.message,
    };
  }

  try {
    await prisma.$transaction(async (transaction) => {
      const record = await transaction.record.create({
        data: {
          ...input.data,
          userId: session.user.id,
        },
      });

      await transaction.auditLog.create({
        data: {
          action: "CREATE",
          target: getRecordAuditTarget(record.id),
          userId: session.user.id,
        },
      });
    });
  } catch {
    return {
      status: "error",
      message: "目前無法新增資料，請稍後再試。",
    };
  }

  revalidatePath("/records");
  revalidatePath("/activity");

  return {
    status: "success",
    message: "資料已新增。",
  };
}

export async function updateRecord(
  recordId: string,
  _previousState: UpdateRecordState,
  formData: FormData,
): Promise<UpdateRecordState> {
  const session = await requireServerSession();
  const normalizedRecordId = validateRecordId(recordId);
  const input = validateRecordInput(formData);

  if (!normalizedRecordId) {
    return {
      status: "error",
      message: "找不到資料或無權執行此操作。",
    };
  }

  if ("message" in input) {
    return {
      status: "error",
      message: input.message,
    };
  }

  try {
    const wasUpdated = await prisma.$transaction(async (transaction) => {
      const result = await transaction.record.updateMany({
        where: {
          id: normalizedRecordId,
          userId: session.user.id,
        },
        data: input.data,
      });

      if (result.count !== 1) {
        return false;
      }

      await transaction.auditLog.create({
        data: {
          action: "UPDATE",
          target: getRecordAuditTarget(normalizedRecordId),
          userId: session.user.id,
        },
      });

      return true;
    });

    if (!wasUpdated) {
      return {
        status: "error",
        message: "找不到資料或無權執行此操作。",
      };
    }
  } catch {
    return {
      status: "error",
      message: "目前無法儲存修改，請稍後再試。",
    };
  }

  revalidatePath("/records");
  revalidatePath(`/records/${normalizedRecordId}`);
  revalidatePath(`/records/${normalizedRecordId}/edit`);
  revalidatePath("/activity");

  return {
    status: "success",
    message: "資料已更新。",
  };
}

export async function deleteRecord(
  recordId: string,
  _previousState: DeleteRecordState,
): Promise<DeleteRecordState> {
  void _previousState;

  const session = await requireServerSession();
  const normalizedRecordId = validateRecordId(recordId);

  if (!normalizedRecordId) {
    return {
      status: "error",
      message: "找不到資料或無權執行此操作。",
    };
  }

  try {
    const wasDeleted = await prisma.$transaction(async (transaction) => {
      const result = await transaction.record.deleteMany({
        where: {
          id: normalizedRecordId,
          userId: session.user.id,
        },
      });

      if (result.count !== 1) {
        return false;
      }

      await transaction.auditLog.create({
        data: {
          action: "DELETE",
          target: getRecordAuditTarget(normalizedRecordId),
          userId: session.user.id,
        },
      });

      return true;
    });

    if (!wasDeleted) {
      return {
        status: "error",
        message: "找不到資料或無權執行此操作。",
      };
    }
  } catch {
    return {
      status: "error",
      message: "目前無法刪除資料，請稍後再試。",
    };
  }

  revalidatePath("/records");
  revalidatePath("/activity");
  redirect("/records?deleted=1");
}
