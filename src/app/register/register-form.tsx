"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authClient } from "@/lib/auth-client";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/records",
      });

      if (result.error) {
        setError("無法建立帳號。此 Email 可能已使用，或資料不符合要求。");
        return;
      }

      router.push("/records");
      router.refresh();
    } catch {
      setError("目前無法完成註冊，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">
          顯示名稱
        </label>
        <input
          autoComplete="name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          id="name"
          maxLength={80}
          name="name"
          required
          type="text"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
          密碼
        </label>
        <div className="relative">
          <input
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-300 py-3 pr-12 pl-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            id="password"
            maxLength={128}
            minLength={8}
            name="password"
            required
            type={showPassword ? "text" : "password"}
          />
          <button
            aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-500 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700"
            onClick={() => setShowPassword((visible) => !visible)}
            type="button"
          >
            {showPassword ? (
              <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
                <path
                  d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9 8 9 8a17.7 17.7 0 0 1-2.1 3.4M6.6 6.6C4.2 8.3 3 12 3 12s3.5 8 9 8a9.8 9.8 0 0 0 4.1-.9"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            ) : (
              <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M3 12s3.5-8 9-8 9 8 9 8-3.5 8-9 8-9-8-9-8Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-500">密碼至少 8 個字元。</p>
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="w-full rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "建立中…" : "建立帳號"}
      </button>

      <p className="text-center text-sm text-slate-600">
        已經有帳號？{" "}
        <Link className="font-semibold text-blue-700 hover:underline" href="/login">
          前往登入
        </Link>
      </p>

      <Link
        className="block w-full rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
        href="/"
      >
        返回首頁
      </Link>
    </form>
  );
}
