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
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
        <p className="text-sm font-semibold tracking-[0.18em] text-blue-700">CREATE ACCOUNT</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">註冊</h1>
        <p className="mt-3 leading-7 text-slate-600">建立測試帳號，開始使用個人資料管理系統。</p>
        <RegisterForm />
      </section>
    </main>
  );
}
