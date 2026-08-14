import Link from "next/link";

export default function RecordNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500">RECORD NOT FOUND</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">找不到這筆資料</h1>
        <p className="mt-4 leading-7 text-slate-600">
          資料可能不存在，或目前登入帳號無權存取。
        </p>
        <Link
          className="mt-8 inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          href="/records"
        >
          返回資料列表
        </Link>
      </section>
    </main>
  );
}
