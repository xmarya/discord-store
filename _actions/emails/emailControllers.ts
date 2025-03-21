"use server"

import EmailTemplate from "@/Components/UI/Email/EmailTemplate";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_KEY);

export async function sendWelcome() {
     try {
         const { data } = await resend.emails.send({
           from: 'Acme <onboarding@resend.dev>',
           to: ['delivered@resend.dev'],
           subject: 'Hello world',
           react: EmailTemplate({ firstName: 'John', message: "it's a Resend Email" }),
         });
     
         return {success: true, data};
     
       } catch (error) {
         return {success:false, error};
       }

}

async function sendSignupConfirmation() {

}

async function sendResetPasswordToken() {

}