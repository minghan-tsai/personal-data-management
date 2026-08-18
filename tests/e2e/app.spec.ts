import { randomUUID } from "node:crypto";

import { expect, type Page, test } from "@playwright/test";

type TestUser = {
  name: string;
  email: string;
  password: string;
};

function createTestUser(label: string): TestUser {
  const suffix = `${Date.now()}-${randomUUID().slice(0, 8)}`;

  return {
    name: `E2E ${label} ${suffix}`,
    email: `e2e-${label.toLowerCase()}-${suffix}@example.com`,
    password: `E2E-${suffix}-Aa1!`,
  };
}

async function register(page: Page, user: TestUser) {
  await page.goto("/register");
  await page.getByLabel("顯示名稱").fill(user.name);
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("密碼", { exact: true }).fill(user.password);
  await page.getByRole("button", { name: "建立帳號" }).click();

  await expect(page).toHaveURL(/\/records$/);
  await expect(page.getByRole("heading", { name: "我的紀錄" })).toBeVisible();
}

async function login(page: Page, user: TestUser) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("密碼", { exact: true }).fill(user.password);
  await page.getByRole("button", { name: "登入", exact: true }).click();

  await expect(page).toHaveURL(/\/records$/);
  await expect(page.getByRole("heading", { name: "我的紀錄" })).toBeVisible();
}

async function logout(page: Page) {
  await page.getByRole("button", { name: "登出", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
}

async function createRecord(page: Page, title: string, content: string) {
  await page.getByLabel("標題").fill(title);
  await page.getByLabel("內容").fill(content);
  await page.getByRole("button", { name: "新增資料" }).click();

  await expect(page.getByRole("status")).toHaveText("資料已新增。");
  await expect(
    page.getByRole("listitem").filter({ hasText: title }),
  ).toBeVisible();
}

function getRecordItem(page: Page, title: string) {
  return page.getByRole("listitem").filter({ hasText: title });
}

test("未登入使用者無法存取受保護頁面", async ({ page }) => {
  await page.goto("/records");
  await expect(page).toHaveURL(/\/login$/);

  await page.goto("/activity");
  await expect(page).toHaveURL(/\/login$/);
});

test("使用者可註冊、重新登入並完成 Record CRUD 與 Activity 流程", async ({
  page,
}) => {
  const user = createTestUser("CRUD");
  const suffix = randomUUID().slice(0, 8);
  const title = `E2E CRUD ${suffix}`;
  const content = `E2E CRUD content ${suffix}`;
  const updatedTitle = `${title} updated`;
  const updatedContent = `${content} updated`;

  await register(page, user);
  await logout(page);
  await login(page, user);

  await createRecord(page, title, content);
  const recordItem = getRecordItem(page, title);
  await expect(recordItem).toContainText(content);
  await recordItem.getByRole("link", { name: "查看詳細" }).click();

  await expect(page.getByRole("heading", { name: title })).toBeVisible();
  await expect(page.getByText(content, { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "修改紀錄" }).click();
  await page.getByLabel("標題").fill(updatedTitle);
  await page.getByLabel("內容").fill(updatedContent);
  await page.getByRole("button", { name: "儲存修改" }).click();
  await expect(page.getByRole("status")).toHaveText("資料已更新。");
  await page.getByRole("link", { name: "取消並返回" }).click();

  await expect(page.getByRole("heading", { name: updatedTitle })).toBeVisible();
  await expect(page.getByText(updatedContent, { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "操作紀錄" }).click();
  await expect(page.getByText("建立資料", { exact: true })).toBeVisible();
  await expect(page.getByText("修改資料", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "返回紀錄列表" }).click();
  await getRecordItem(page, updatedTitle)
    .getByRole("link", { name: "查看詳細" })
    .click();

  page.once("dialog", async (dialog) => {
    expect(dialog.type()).toBe("confirm");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "刪除資料" }).click();

  await expect(page).toHaveURL(/\/records\?deleted=1$/);
  await expect(page.getByRole("status")).toHaveText("資料已刪除。");
  await expect(getRecordItem(page, updatedTitle)).toHaveCount(0);

  await page.getByRole("link", { name: "操作紀錄" }).click();
  await expect(page.getByText("刪除資料", { exact: true })).toBeVisible();
});

test("使用者無法查看或編輯其他帳號的 Record", async ({ page }) => {
  const userA = createTestUser("OWNER-A");
  const userB = createTestUser("OWNER-B");
  const suffix = randomUUID().slice(0, 8);
  const titleA = `E2E OWNER A ${suffix}`;
  const contentA = `E2E private content A ${suffix}`;

  await register(page, userA);
  await createRecord(page, titleA, contentA);

  const recordPath = await getRecordItem(page, titleA)
    .getByRole("link", { name: "查看詳細" })
    .getAttribute("href");

  if (!recordPath) {
    throw new Error("測試無法取得 User A 的 Record URL。");
  }

  await logout(page);
  await register(page, userB);

  await expect(getRecordItem(page, titleA)).toHaveCount(0);

  await page.goto(recordPath);
  await expect(
    page.getByRole("heading", { name: "找不到這筆紀錄" }),
  ).toBeVisible();
  await expect(page.getByText(titleA, { exact: true })).toHaveCount(0);
  await expect(page.getByText(contentA, { exact: true })).toHaveCount(0);

  await page.goto(`${recordPath}/edit`);
  await expect(
    page.getByRole("heading", { name: "找不到這筆紀錄" }),
  ).toBeVisible();
  await expect(page.getByText(titleA, { exact: true })).toHaveCount(0);
  await expect(page.getByText(contentA, { exact: true })).toHaveCount(0);

  await logout(page);
  await login(page, userA);
  await page.goto(recordPath);
  await expect(page.getByRole("heading", { name: titleA })).toBeVisible();

  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  await page.getByRole("button", { name: "刪除資料" }).click();
  await expect(page).toHaveURL(/\/records\?deleted=1$/);
});
