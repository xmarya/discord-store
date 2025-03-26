"use server"

import { signIn } from "@/_config/auth";
import { withDBConnection } from "@/_utils/controllerWrapper";
import User from "@/models/userModel";

export async function discordSignIn() {
    await signIn("discord", { redirectTo: "/dashboard" });
  }
  
  export const createDiscordUser = withDBConnection(async (newUser) => {
    await User.create({
      email: newUser.email,
      username: newUser.name,
      image: newUser.image,
      signMethod: "discord",
      discord: {id: newUser.id}
      //TODO: distinguish between the sigWay methods
    });
  
    // NOTE: I think there is no need to return the newly created usr because the signIn callback only returns boolean
  });