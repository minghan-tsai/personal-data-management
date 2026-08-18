"use client";

import Link from "next/link";
import { useActionState } from "react";

import { updateRecord } from "@/app/records/actions";
import type { UpdateRecordState } from "@/app/records/actions";

const initialUpdateRecordState: UpdateRecordState = {
  status: "idle",
  message: "",
};

type EditRecordFormProps = {
  record: {
    id: string;
    title: string;
    content: string | null;
  };
};

export function EditRecordForm({ record }: EditRecordFormProps) {
  const updateRecordWithId = updateRecord.bind(null, record.id);
  const [state, formAction, isPending] = useActionState(
    updateRecordWithId,
    initialUpdateRecordState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label className="field-label" htmlFor="title">
          標題
        </label>
        <input
          className="field-control"
          defaultValue={record.title}
          id="title"
          maxLength={120}
          name="title"
          required
          type="text"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="content">
          內容
        </label>
        <textarea
          className="field-control min-h-40 resize-y"
          defaultValue={record.content ?? ""}
          id="content"
          maxLength={2000}
          name="content"
        />
      </div>

      {state.message ? (
        <p
          className={
            state.status === "error"
              ? "status-message status-error"
              : "status-message status-success"
          }
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
        <button
          className="button button-primary"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "儲存中…" : "儲存修改"}
        </button>
        <Link
          className="button button-secondary"
          href={`/records/${record.id}`}
        >
          取消並返回
        </Link>
        <Link className="button button-secondary" href="/records">
          返回紀錄列表
        </Link>
      </div>
    </form>
  );
}
