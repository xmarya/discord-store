import { z } from "zod";
import { isDuplicated } from "../checkAvailability";

export const StoreSchema = (storeId:string) => z.object({
  storeName: z
    .string()
    .min(3, { message: "لابد من إضافة اسم للمتجر يحتوي على 3 أحرف على الأقل" })
    .regex(/^(?!\d+$)[\p{L}\p{N} ]+$/u, { message: "يجب أن يحتوي الاسم على أحرف وأرقام فقط" })
    .superRefine(async (storeName, ctx) =>  {
        const isTaken = await isDuplicated("Store", "storeName", storeName ,storeId);
        if(isTaken) ctx.addIssue({
            code:"custom",
            path:["storeName"],
            message: "اسم المتجر مستخدم بالفعل"
        });
    }),
});

const ACCEPTED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml"
]
const MAX_IMAGE_SIZE = 1024 * 1024 * 1.5; // converting 1.5MB to KB


export const StoreLogo = z.object({
    logo: z.instanceof(File).optional()
    .refine(file => {
        return !file || file.size > MAX_IMAGE_SIZE
    }, {message: "يجب ألّا يتجاوز حجم الشعار 1.5MB"})
    .refine( file => {
        if(file) return ACCEPTED_IMAGE_TYPES.includes(file?.type)
    }, {message: "صيغة الملف غير مقبولة"})
});
