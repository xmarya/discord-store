"use server";

import { signIn } from "@/config/auth";

export async function discordSignIn() {
  await signIn("discord", { redirectTo: "/dashboard" });
}
