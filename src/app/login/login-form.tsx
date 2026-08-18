"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/records",
      });

      if (result.error) {
        setError("Email 或密碼錯誤。");
        return;
      }

      router.push("/records");
      router.refresh();
    } catch {
      setError("目前無法完成登入，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            className="field-control pr-12"
            id="password"
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
        {isSubmitting ? "登入中…" : "登入"}
      </button>

      <p className="text-center text-sm text-slate-600">
        還沒有帳號？{" "}
        <Link className="font-semibold text-blue-700 underline-offset-4 hover:underline" href="/register">
          建立帳號
        </Link>
      </p>

      <Link
        className="button button-secondary w-full"
        href="/"
      >
        返回首頁
      </Link>
    </form>
  );
}
