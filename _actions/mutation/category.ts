"use server";

import { withDBConnection } from "@/_utils/controllerWrapper";
import { CategoryBasic } from "@/_Types/Category";
import Category from "@/models/categoryModel";

export const createCategory = withDBConnection(async (category: CategoryBasic, storeId: string) => {
  const newCategory = await Category.create({
    name: category.name,
    colour: category.colour,
    store: storeId,
  });
  return JSON.parse(JSON.stringify(newCategory));
});

export const updateCategory = withDBConnection(async (categoryId, updatedCategory: Partial<CategoryBasic>) => {
  const updatedDoc = await Category.findByIdAndUpdate(categoryId, {
    ...updatedCategory
  });

  return JSON.parse(JSON.stringify(updatedDoc));
});

export const deleteCategory = withDBConnection(async (categoryId) => {
  await Category.findByIdAndDelete(categoryId);
});
