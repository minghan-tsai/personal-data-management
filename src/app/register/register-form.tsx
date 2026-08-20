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
    <form className="mt-7 space-y-[1.125rem]" onSubmit={handleSubmit}>
      <div>
        <label className="field-label" htmlFor="name">
          顯示名稱
        </label>
        <input
          autoComplete="name"
          className="field-control"
          id="name"
          maxLength={80}
          name="name"
          required
          type="text"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="field-control"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="password">
          密碼
        </label>
        <div className="relative">
          <input
            autoComplete="new-password"
            className="field-control pr-12"
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
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-[0.625rem] text-slate-500 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700"
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
        <p className="help-text">密碼至少 8 個字元。</p>
      </div>

      {error ? (
        <p className="status-message status-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="button button-primary w-full"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "建立中…" : "建立帳號"}
      </button>

      <p className="text-center text-sm text-slate-600">
        已經有帳號？{" "}
        <Link className="font-semibold text-blue-700 underline-offset-4 hover:underline" href="/login">
          前往登入
        </Link>
      </p>

      <Link
        className="mx-auto flex w-fit rounded text-sm font-semibold text-slate-500 underline-offset-4 transition hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        href="/"
      >
        ← 返回首頁
      </Link>
    </form>
  );
}
