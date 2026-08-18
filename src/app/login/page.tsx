import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/login/login-form";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "登入｜個人資料管理系統",
};

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/records");
  }

  return (
    <main className="auth-shell">
      <section className="panel w-full p-7 sm:p-9">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">登入</h1>
        <p className="mt-3 leading-7 text-slate-600">使用測試帳號登入，進入受保護的個人紀錄管理頁面。</p>
        <LoginForm />
      </section>
    </main>
  );
}
