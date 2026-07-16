export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-12">
        <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-blue-700">
          PERSONAL DATA MANAGEMENT
        </p>

        <div className="space-y-5">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            蔡明翰的個人資料管理系統
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            這是一個全端網站作品，未來將提供帳號登入，以及新增、查看、修改與刪除虛構個人資料紀錄的功能。
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white opacity-70"
          >
            登入（即將開放）
          </button>
          <button
            type="button"
            disabled
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 opacity-70"
          >
            註冊（即將開放）
          </button>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm leading-6 text-slate-500">
            目前為第 1 階段專案骨架，尚未建立登入、資料庫或資料管理功能。
            本作品僅使用虛構測試資料。
          </p>
        </div>
      </section>
    </main>
  );
}
