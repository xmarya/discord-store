import SignOutButton from "@/Components/Blocks/SignOutButton";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h2> لوحة التحكم</h2>
      <ul>
        <li>
          <Link href="/dashboard/profile">تعديل بياناتي</Link>
        </li>
        <li>
          <Link href="/dashboard/my-store">متجري</Link>
        </li>
        <li>
          <SignOutButton/>
        </li>
      </ul>
    </div>
  );
}
