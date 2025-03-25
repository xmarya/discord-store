"use server"

import EmailTemplate from "@/Components/UI/Email/EmailTemplate";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_KEY);

export async function sendWelcome(username:string) {
     try {
         const { data, error } = await resend.emails.send({
           from: 'Acme <onboarding@resend.dev>',
           to: "shhmmanager1@gmail.com",
           subject: 'Signup Successfully!',
           react: EmailTemplate({ message: `HI ${username}, Welcome to SAHM platform` }),
         });

         if(error) console.log("ERROR🔴 SEND EMAIL", error);
     
         return {success: true, data};
     
       } catch (error) {
        console.log("ERROR🔴 SEND EMAIL");
         return {success:false, error};
       }

}

async function sendSignupConfirmation() {

}

async function sendResetPasswordToken() {

}