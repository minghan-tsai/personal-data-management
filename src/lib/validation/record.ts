import { z } from "zod";

export const RECORD_TITLE_MAX_LENGTH = 120;
export const RECORD_CONTENT_MAX_LENGTH = 2000;

export const INVALID_RECORD_INPUT_MESSAGE = "資料格式不正確，請重新輸入。";
export const INVALID_RECORD_ID_MESSAGE = "資料識別碼格式不正確。";

export const recordInputSchema = z.object({
  title: z
    .string({ error: INVALID_RECORD_INPUT_MESSAGE })
    .trim()
    .min(1, { error: "標題不可為空白。" })
    .max(RECORD_TITLE_MAX_LENGTH, {
      error: `標題不可超過 ${RECORD_TITLE_MAX_LENGTH} 個字元。`,
    }),
  content: z
    .string({ error: INVALID_RECORD_INPUT_MESSAGE })
    .trim()
    .max(RECORD_CONTENT_MAX_LENGTH, {
      error: `內容不可超過 ${RECORD_CONTENT_MAX_LENGTH} 個字元。`,
    })
    .transform((content) => content || null),
});

export const recordIdSchema = z
  .string({ error: INVALID_RECORD_ID_MESSAGE })
  .trim()
  .pipe(z.cuid({ error: INVALID_RECORD_ID_MESSAGE }));

export type RecordInput = z.output<typeof recordInputSchema>;
