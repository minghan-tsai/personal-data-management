"use client";

import { useActionState, useEffect, useRef } from "react";

import { createRecord } from "@/app/records/actions";
import type { CreateRecordState } from "@/app/records/actions";

const initialCreateRecordState: CreateRecordState = {
  status: "idle",
  message: "",
};

export function NewRecordForm() {
  const [state, formAction, isPending] = useActionState(
    createRecord,
    initialCreateRecordState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="title">
          標題
        </label>
        <input
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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
          className="min-h-32 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          id="content"
          maxLength={2000}
          name="content"
          placeholder="可留空"
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

      <button
        className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "新增中…" : "新增資料"}
      </button>
    </form>
  );
}
