import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/_data/constants";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "أدخل اسم منتج لا يقل عن 3 أحرف" })
    .regex(/^(?!\d+$)[\p{L}\p{N} ]+$/u, { message: "يجب أن يحتوي الاسم على أحرف وأرقام فقط" })
    .trim(),
  price: z.number().positive({ message: "سعر المنتج لا يقبل قيمة سالبة" }),
  quantity: z.number().nonnegative(),
  description: z.string().min(10, { message: "الرجاء كتابة وصف لا يقل عن 10 أحرف" }).trim(),
  status: z.enum(["inStock", "outOfStock"]),
  discount: z.number().positive().optional(),
  image: z
    .instanceof(File)
    .refine(
      (file) => {
        return !file || file.size > MAX_IMAGE_SIZE;
      },
      { message: "يجب ألّا يتجاوز حجم الصورة 1.5MB" }
    )
    .refine(
      (file) => {
        if (file) return ACCEPTED_IMAGE_TYPES.includes(file.type);
      },
      { message: "صيغة الملف غير مقبولة" }
    ),
});
