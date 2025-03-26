"use server";

import { ProductDocument } from "@/_Types/Product";
import { withDBConnection } from "@/_utils/controllerWrapper";
import { ProductSchema } from "@/_utils/ZodValidations/productSchema";
import Product from "@/models/productModel";

export const createProduct = withDBConnection(async (prevData: any, formData: FormData) => {
  const inputs = Object.fromEntries(formData);

  const validation = ProductSchema.safeParse(inputs);

  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().formErrors,
      rawData: inputs,
    };

  const random = crypto.randomUUID().split("-")[0];
  const newProduct = await Product.create({
    name: `product${random}`,
    price: 14.25,
    quantity: 4,
    image: "image.jpeg",
    category: "",
    description: "description",
    status: "inStock",
    store: "storeId" /* CHANGE LATER: get the storeId properly */,
  });

  return JSON.parse(JSON.stringify(newProduct));
});

export const updateProduct = withDBConnection(async (productId, updatedProduct: Partial<ProductDocument>) => {
  const updatedDoc = await Product.findOneAndUpdate(productId, {
    ...updatedProduct,
  });

  return JSON.parse(JSON.stringify(updatedDoc));
});

export const deleteProduct = withDBConnection(async (productId) => {
  await Product.findByIdAndDelete(productId);
});
