import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/_data/constants";
import { isDuplicated } from "@/_utils/checkAvailability";
import {z} from "zod";

export const SignupFormSchema = z.object({
    email: z.string().email({message: "لابد من كتابة بريد إلكتروني صحيح"}).min(1,"حقل إجباري").trim()
    .superRefine(async (email, ctx) => {
        const isTaken = await isDuplicated("User", "email", email);
        if(isTaken) ctx.addIssue({
            code:"custom",
            path:["email"],
            message: "هذا البريد الإلكتروني مسجل"
        });
    }),

    username: z.string().min(5, {message:"يجب ألّا يقل اسم المستخدم عن 5 أحرف"}).
            max(15, {message: "يجب ألّا يزيد اسم المستخدم عن 15 حرف"}).min(5,"حقل إجباري")
            .regex(/^\S*$/, {message: "لا يسمح بالمسافة في اسم المستخدم"}).trim()
            .superRefine(async (username, ctx) => {
                const isTaken = await isDuplicated("User", "username", username);
                if(isTaken) ctx.addIssue({
                    code:"custom",
                    path: ["username"],
                    message: "اسم المستخدم هذا مسجل"
                });
            },),

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
    email: z.string().email({message:"لابد من كتابة بريد إلكتروني صحيح"}).nonempty("حقل إجباري").trim(),
    password: z.string().min(8,"حقل إجباري").trim(),
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword:z.string().min(8,{message:"يجب ألّا تقل كلمة المرور عن 8 خانات"})
    .regex(/[a-zA-Z]/, { message: 'يجب تضمين حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'يجب تضمين رقم واحد على الأقل' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'يجب تضمين حرف خاص واحد على الأقل',
    }).trim(),

    newPasswordConfirm:z.string().min(8,"حقل إجباري").trim()
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

    newPasswordConfirm:z.string().min(8,"حقل إجباري").trim()
}).refine(data => data.newPassword === data.newPasswordConfirm, {
    message: "تأكد من مطابقة كلمات المرور",
    path: ["passwordConfirm"]
});

export const UpdateUserProfileSchema = z.object({
    email: z.string().email({message: "لابد من كتابة بريد إلكتروني صحيح"}).min(1,"حقل إجباري").trim()
    .superRefine(async (email, ctx) => {
        const isTaken = await isDuplicated("User", "email", email);
        if(isTaken) ctx.addIssue({
            code:"custom",
            path:["email"],
            message: "هذا البريد الإلكتروني مسجل"
        });
    }),

    username: z.string().min(5, {message:"يجب ألّا يقل اسم المستخدم عن 5 أحرف"}).
            max(15, {message: "يجب ألّا يزيد اسم المستخدم عن 15 حرف"}).min(5,"حقل إجباري")
            .regex(/^\S*$/, {message: "لا يسمح بالمسافة في اسم المستخدم"}).trim()
            .superRefine(async (username, ctx) => {
                const isTaken = await isDuplicated("User", "username", username);
                if(isTaken) ctx.addIssue({
                    code:"custom",
                    path: ["username"],
                    message: "اسم المستخدم هذا مسجل"
                });
            },),
    image:z.instanceof(File)
    .refine(file => {
        !file || file.size > MAX_IMAGE_SIZE
    }, {message :"يجب ألّا يتجاوز حجم الصورة 1.5MB"})
    .refine(file => {
        if(file) ACCEPTED_IMAGE_TYPES.includes(file.type)
    }, {message: "صيغة الملف غير مقبولة"})
});