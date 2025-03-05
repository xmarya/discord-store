"use server"

import { signIn } from "@/config/auth"
import { withDBConnection } from "@/utils/controllerWrapper";
import Auth from "@/models/authModel";

export async function discordSignIn() {
    await signIn("discord", {redirectTo: "/dashboard"});
}

export const createUserAuth = withDBConnection( async(newUser) => {
    const user = await Auth.create({
        discordId: newUser.id,
        discordEmail: newUser.email,
        discordName: newUser.name,
        image: newUser.image
    });
    console.log("createNewUser🎭", user.name);
    // NOTE: I think there is no need to return the newly created usr because the signIn callback only returns boolean
    // return user;
});

export const updateAuthUser = withDBConnection(async(email: string, formDate:FormData) => {
    
});
   