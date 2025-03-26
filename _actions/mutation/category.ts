"use server";

import { withDBConnection } from "@/_utils/controllerWrapper";
import { CategoryBasic } from "@/_Types/Category";
import Category from "@/models/categoryModel";
import Product from "@/models/productModel";
import { startSession } from "mongoose";

export const createCategory = withDBConnection(async (category: CategoryBasic, storeId: string) => {
  const random = Math.random() * 10;
  const newCategory = await Category.create({
    name: category.name,
    colour: category.colour,
    store: storeId,
  });

  await Product.create({
    name: `product${random}`,
    price: 14.25,
    quantity: 4,
    image: "image.jpeg",
    category: newCategory._id,
    description: "description",
    status: "inStock",
    store: storeId,
  });

  return JSON.parse(JSON.stringify(newCategory));
});

export const updateCategory = withDBConnection(async (categoryId, updatedCategory: CategoryBasic) => {
  const updatedDoc = await Category.findByIdAndUpdate();
});

export const deleteCategory = withDBConnection(async (categoryId) => {
  await Category.findByIdAndDelete(categoryId);
});
