"use client"

import { useRouter } from "next/navigation"


type Props = {
    error:Error & { digest?: string},
    reset: () => void
}
export default function error({error, reset}:Props) {
  const router = useRouter();
    return (
      <main>
      <h1>{error.message}</h1>
      <button onClick={reset}>
        حاول مجددًا
      </button>
      <button onClick={() => router.back()}>
        العودة
      </button>
    </main>
    )
}

