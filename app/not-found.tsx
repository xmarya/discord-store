"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
        <div>
            <h2>الصفحة التي تحاول الوصول لها غير موجودة</h2>
            <button onClick={() => router.back()}>
                العودة
            </button>
        </div>
    )
}

