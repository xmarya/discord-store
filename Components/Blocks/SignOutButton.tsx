"use client";

import { logout } from "@/_actions/auth/credentials";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button>
        <span>تسجيل الخروج</span>
      </button>
    </form>
  );
}
