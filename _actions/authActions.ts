"use server";

import { signIn } from "@/_config/auth";

export async function discordSignIn() {
  await signIn("discord", { redirectTo: "/dashboard" });
}
