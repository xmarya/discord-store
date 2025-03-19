import {z} from "zod";

export const SignupFormSchema = z.object({
    email: z.string().email({message: "لابد من كتابة بريد إلكتروني صحيح"}).trim(),
    username: z.string().min(5, {message:"يجب ألّا يقل اسم المستخدم عن 5 أحرف"}).
            max(15, {message: "يجب ألّا يزيد اسم المستخدم عن 15 حرف"}).trim(),
    password: z.string().min(8,{message:"يجب ألّا تقل كلمة المرور عن 8 خانات"})
    .regex(/[a-zA-Z]/, { message: 'يجب تضمين حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'يجب تضمين رقم واحد على الأقل' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'يجب تضمين حرف خاص واحد على الأقل',
    })
    .trim(),
    passwordConfirm: z.string().trim()
}).refine((data) => data.password === data.passwordConfirm, {
    message: "تأكد من مطابقة كلمات المرور",
    path: ["passwordConfirm"]
});

export const LoginFormSchema = z.object({
    email: z.string().email({message:"لابد من كتابة بريد إلكتروني صحيح"}).trim(),
    password: z.string().trim(),
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword:z.string().min(8,{message:"يجب ألّا تقل كلمة المرور عن 8 خانات"})
    .regex(/[a-zA-Z]/, { message: 'يجب تضمين حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'يجب تضمين رقم واحد على الأقل' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'يجب تضمين حرف خاص واحد على الأقل',
    }).trim(),
    newPasswordConfirm:z.string().trim()
}).refine(data => data.newPassword === data.newPasswordConfirm, {
    message: "تأكد من مطابقة كلمات المرور",
    path: ["passwordConfirm"]
});

export const ResetPasswordSchema = z.object({
    newPassword:z.string().min(8,{message:"يجب ألّا تقل كلمة المرور عن 8 خانات"})
    .regex(/[a-zA-Z]/, { message: 'يجب تضمين حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'يجب تضمين رقم واحد على الأقل' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'يجب تضمين حرف خاص واحد على الأقل',
    }).trim(),
    newPasswordConfirm:z.string().trim()
}).refine(data => data.newPassword === data.newPasswordConfirm, {
    message: "تأكد من مطابقة كلمات المرور",
    path: ["passwordConfirm"]
});