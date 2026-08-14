"use client";

import { useActionState } from "react";

import { deleteRecord } from "@/app/records/actions";
import type { DeleteRecordState } from "@/app/records/actions";

const initialDeleteRecordState: DeleteRecordState = {
  status: "idle",
  message: "",
};

export function DeleteRecordButton({ recordId }: { recordId: string }) {
  const deleteRecordWithId = deleteRecord.bind(null, recordId);
  const [state, formAction, isPending] = useActionState(
    deleteRecordWithId,
    initialDeleteRecordState,
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("確定要刪除這筆資料嗎？刪除後無法復原。")) {
          event.preventDefault();
        }
      }}
    >
      <button
        className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "刪除中…" : "刪除資料"}
      </button>

      {state.status === "error" ? (
        <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
