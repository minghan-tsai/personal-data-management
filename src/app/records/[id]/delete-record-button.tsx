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
        className="button button-danger w-full sm:w-auto"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "刪除中…" : "刪除資料"}
      </button>

      {state.status === "error" ? (
        <p className="status-message status-error mt-3" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
