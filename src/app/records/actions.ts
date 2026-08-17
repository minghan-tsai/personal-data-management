"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireServerSession } from "@/lib/session";
import {
  INVALID_RECORD_ID_MESSAGE,
  INVALID_RECORD_INPUT_MESSAGE,
  recordIdSchema,
  recordInputSchema,
} from "@/lib/validation/record";

function getRecordAuditTarget(recordId: string) {
  return `Record:${recordId}`;
}

export type CreateRecordState = {
  status: "idle" | "error" | "success";
  message: string;
};

export type UpdateRecordState = CreateRecordState;
export type DeleteRecordState = CreateRecordState;

export async function createRecord(
  _previousState: CreateRecordState,
  formData: FormData,
): Promise<CreateRecordState> {
  const session = await requireServerSession();
  const input = recordInputSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!input.success) {
    return {
      status: "error",
      message: input.error.issues[0]?.message ?? INVALID_RECORD_INPUT_MESSAGE,
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
  const parsedRecordId = recordIdSchema.safeParse(recordId);
  const input = recordInputSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsedRecordId.success) {
    return {
      status: "error",
      message: parsedRecordId.error.issues[0]?.message ?? INVALID_RECORD_ID_MESSAGE,
    };
  }

  if (!input.success) {
    return {
      status: "error",
      message: input.error.issues[0]?.message ?? INVALID_RECORD_INPUT_MESSAGE,
    };
  }

  const normalizedRecordId = parsedRecordId.data;

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
  const parsedRecordId = recordIdSchema.safeParse(recordId);

  if (!parsedRecordId.success) {
    return {
      status: "error",
      message: parsedRecordId.error.issues[0]?.message ?? INVALID_RECORD_ID_MESSAGE,
    };
  }

  const normalizedRecordId = parsedRecordId.data;

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
