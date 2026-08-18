import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { RegisterForm } from "@/app/register/register-form";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "註冊｜個人資料管理系統",
};

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/records");
  }

  return (
    <main className="auth-shell">
      <section className="panel w-full p-7 sm:p-9">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">註冊</h1>
        <p className="mt-3 leading-7 text-slate-600">建立虛構測試帳號，開始使用個人紀錄管理功能。</p>
        <RegisterForm />
      </section>
    </main>
  );
}
