import { describe, expect, it } from "vitest";

import {
  RECORD_CONTENT_MAX_LENGTH,
  RECORD_TITLE_MAX_LENGTH,
  recordIdSchema,
  recordInputSchema,
} from "./record";

const VALID_CUID = "cjld2cjxh0000qzrmn831i7rn";

function parseRecordInput(title: unknown, content: unknown) {
  return recordInputSchema.safeParse({ title, content });
}

describe("recordInputSchema title", () => {
  it("accepts a valid title", () => {
    const result = parseRecordInput("工作紀錄", "完成單元測試");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("工作紀錄");
    }
  });

  it("trims surrounding whitespace", () => {
    const result = parseRecordInput("  工作紀錄  ", "內容");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("工作紀錄");
    }
  });

  it("rejects a whitespace-only title", () => {
    expect(parseRecordInput("   ", "內容").success).toBe(false);
  });

  it("accepts a title at the maximum length", () => {
    expect(
      parseRecordInput("A".repeat(RECORD_TITLE_MAX_LENGTH), "內容").success,
    ).toBe(true);
  });

  it("rejects a title over the maximum length", () => {
    expect(
      parseRecordInput("A".repeat(RECORD_TITLE_MAX_LENGTH + 1), "內容")
        .success,
    ).toBe(false);
  });

  it("rejects a non-string title", () => {
    expect(parseRecordInput(123, "內容").success).toBe(false);
  });
});

describe("recordInputSchema content", () => {
  it("accepts valid content", () => {
    const result = parseRecordInput("標題", "這是一段內容");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).toBe("這是一段內容");
    }
  });

  it("trims surrounding whitespace", () => {
    const result = parseRecordInput("標題", "  這是一段內容  ");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).toBe("這是一段內容");
    }
  });

  it("transforms whitespace-only content to null", () => {
    const result = parseRecordInput("標題", "   ");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).toBeNull();
    }
  });

  it("accepts content at the maximum length", () => {
    expect(
      parseRecordInput("標題", "A".repeat(RECORD_CONTENT_MAX_LENGTH)).success,
    ).toBe(true);
  });

  it("rejects content over the maximum length", () => {
    expect(
      parseRecordInput(
        "標題",
        "A".repeat(RECORD_CONTENT_MAX_LENGTH + 1),
      ).success,
    ).toBe(false);
  });

  it("rejects non-string content", () => {
    expect(parseRecordInput("標題", 123).success).toBe(false);
  });
});

describe("recordIdSchema", () => {
  it("accepts a valid CUID", () => {
    expect(recordIdSchema.safeParse(VALID_CUID).success).toBe(true);
  });

  it("trims surrounding whitespace before validation", () => {
    const result = recordIdSchema.safeParse(`  ${VALID_CUID}  `);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe(VALID_CUID);
    }
  });

  it("rejects an invalid ID", () => {
    expect(recordIdSchema.safeParse("not-a-cuid").success).toBe(false);
  });

  it.each(["", "   "])("rejects an empty ID: %j", (recordId) => {
    expect(recordIdSchema.safeParse(recordId).success).toBe(false);
  });

  it("rejects a non-string ID", () => {
    expect(recordIdSchema.safeParse(123).success).toBe(false);
  });
});
