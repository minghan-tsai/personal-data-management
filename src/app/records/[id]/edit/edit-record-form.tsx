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
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="title">
          標題
        </label>
        <input
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          defaultValue={record.title}
          id="title"
          maxLength={120}
          name="title"
          required
          type="text"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="content">
          內容
        </label>
        <textarea
          className="min-h-40 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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
              ? "rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              : "rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          }
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "儲存中…" : "儲存修改"}
        </button>
        <Link
          className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
          href={`/records/${record.id}`}
        >
          取消並返回
        </Link>
      </div>
    </form>
  );
}
