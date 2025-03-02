import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>منصة سهم - الصفحة الرئيسية</h1>
      <Link href="/login">
        <h4>سجّل في المنصة</h4>
      </Link>
    </main>
  );
}
