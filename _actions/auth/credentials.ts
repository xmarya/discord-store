"use server"

import { signIn, signOut } from "@/_config/auth";
import { LoginFormSchema, SignupFormSchema } from "@/_Types/ZodSchema";
import { withDBConnection } from "@/_utils/controllerWrapper";
import { jwtSignature } from "@/_utils/generateToken";
import User from "@/models/userModel";



export const credentialsSignup = withDBConnection(async (preState:any, formData:FormData) => {
    // STEP: 1) checking the formData against zod schema:
    const inputs = Object.fromEntries(formData);
    const validation = SignupFormSchema.safeParse(inputs);

    if(!validation.success) return {
            success: false,
            message: "بعض المدخلات خاطئة",
            errors: validation.error.flatten().fieldErrors,
            rawData: inputs
        }
    
    const newUser = await User.create({
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
        // userType: "user", no need to define this field since it has default value in the schema level
        signMethod: "credentials"
    });

    // TODO: send an email for confirmation the account
});

export async function credentialsLogin(preState:any, formData:FormData) {
    // STEP: 1) checking the formData against zod schema:
    const result = LoginFormSchema.safeParse(formData);
    await signIn("credentials", {redirectTo: "/dashboard"});
}

export async function logout() {
    await signOut({ redirectTo: "/login"});
}