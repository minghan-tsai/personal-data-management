import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { getServerSession } from "@/lib/session";

export async function SiteHeader() {
  const session = await getServerSession();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="site-container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="brand-link w-fit text-sm font-bold tracking-tight text-slate-950 sm:text-base"
          href="/"
        >
          Personal Data Management System
        </Link>

        <nav aria-label="主要導覽" className="flex flex-wrap items-center gap-1 sm:justify-end">
          {session ? (
            <>
              <Link className="nav-link rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950" href="/">
                首頁
              </Link>
              <Link className="nav-link rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950" href="/records">
                我的紀錄
              </Link>
              <Link className="nav-link rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950" href="/activity">
                操作紀錄
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link className="nav-link rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950" href="/">
                首頁
              </Link>
              <Link className="nav-link rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950" href="/login">
                登入
              </Link>
              <Link className="button button-primary min-h-0 px-3 py-2 text-sm" href="/register">
                註冊
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
