import Link from "next/link";

export default function Dashboard() {
    return (
        <div>
            here is the dashboard
            <button>
                <Link href="/api/auth/signout">تسجيل الخروج</Link>
            </button>
        </div>
    )
}

