import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>منصة سهم - الصفحة الرئيسية</h1>
      <Link href="/login">
        <h3>دخول للمنصة</h3>
      </Link>
      <Link href="/sign-up">
          <h3>تسجيل في المنصة</h3>
      </Link>
    </main>
  );
}
