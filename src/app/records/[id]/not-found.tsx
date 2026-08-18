import Link from "next/link";

export default function RecordNotFound() {
  return (
    <main className="auth-shell max-w-xl">
      <section className="panel w-full p-8 text-center sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">找不到這筆紀錄</h1>
        <p className="mt-4 leading-7 text-slate-600">
          資料可能不存在，或目前登入帳號無權存取。
        </p>
        <Link className="button button-primary mt-8" href="/records">
          返回紀錄列表
        </Link>
      </section>
    </main>
  );
}
