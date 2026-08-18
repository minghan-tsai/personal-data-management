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
        <label className="field-label" htmlFor="title">
          標題
        </label>
        <input
          className="field-control"
          id="title"
          maxLength={120}
          name="title"
          placeholder="輸入紀錄標題"
          required
          type="text"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="content">
          內容
        </label>
        <textarea
          className="field-control min-h-36 resize-y"
          id="content"
          maxLength={2000}
          name="content"
          placeholder="補充內容（可留空）"
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

      <button
        className="button button-primary w-full sm:w-auto"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "新增中…" : "新增資料"}
      </button>
    </form>
  );
}
