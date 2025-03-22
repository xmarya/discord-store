"use server"

import { signIn, signOut } from "@/_config/auth";
import { LoginFormSchema, SignupFormSchema } from "@/_Types/ZodSchema";
import { withDBConnection } from "@/_utils/controllerWrapper";
import User from "@/models/userModel";
import { sendWelcome } from "../emails/emailControllers";
import { getUser } from "../controllerGlobal";
import { isDuplicated } from "@/_utils/checkAvailability";



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
    console.log("BEFORE HASHING", inputs.password);
    const result = await isDuplicated("User", "email", (inputs.email) as string);
    console.log("isDuplicated", result);

    if(result) return {
        success:false,
        errors: {email: ["هذا البريد الإلكتروني مسجل بالفعل"]},
        rawData: inputs
    }


    const newUser = await User.create({
        email: formData.get("email"),
        username: formData.get("username"),
        credentials: {password: formData.get("password")},
        // userType: "user", no need to define this field since it has default value in the schema level
        signMethod: "credentials"
    });

    // TODO: send an email for confirmation the account
    // await sendWelcome(newUser.username);

    // redirect() doesn't work in try/catch => https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
    // redirectToPage("welcome");
});

export const credentialsLogin = withDBConnection(async (preState:any, formData:FormData) => {
        // STEP: 1) checking the formData against zod schema:
        const inputs = Object.fromEntries(formData); // NOTE: inputs in now a plain JS object, it's not FORM data that's why .get isn't callable

        const validation = LoginFormSchema.safeParse(inputs);
        if(!validation.success) return {
            success: false,
            message: "بعض المدخلات خاطئة",
            errors: validation.error.flatten().fieldErrors,
            rawData: inputs
        }
    
        const email = inputs.email as string;
        const password = inputs.password as string;
    
        // STEP: 2) before letting the login, check it is exist in the db or not:
        const user = await getUser(email, "credentials");

        // maybe there is a user associated with the email, but there is no credentials since the email belongs to a discord account.
        if(!user || !user?.credentials?.password) return {
            success: false,
            errors: {email: ["هذا البريد الإلكتروني غير مسجل"]},
            rawData: inputs
        }

        // STEP: 2) does the provided password match the stored one in the db?
        if(!(await user.comparePasswords(password, user.credentials.password))) 
            return {
                success: false,
                errors: {password: ["كلمة المرور خاطئة"]},
                rawData: inputs
            }
    
        await signIn("credentials", {
                email,
                redirectTo: "/dashboard"
            });
    
});

export async function logout() {
    await signOut({ redirectTo: "/login"});
}