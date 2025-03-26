"use server";

import { auth } from "@/_config/auth";
import { withDBConnection } from "@/_utils/controllerWrapper";
import { StoreSchema } from "@/_utils/ZodValidations/storeSchema";
import Store from "@/models/storeModel";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";

export const createStore = withDBConnection(async (prevState:any, formData: FormData) => {
  // the newStore probably if got from the formData, the userId from the session
  const session = await auth();
  const userId = session?.user.id;
  const {storeName, logo} = Object.fromEntries(formData);

  // STEP 1) create the new store:
  const newStore = await Store.create({
    // storeName: formData.get("storeName"),
    storeName,
    owner: userId,
    
  });

  // STEP 2) link it with the user using userId:
  await User.findByIdAndUpdate(userId, { myStore: newStore._id });

  // STEP 3) revalidate the path
  revalidatePath("/dashboard/myStore");
});

export const updateStore = withDBConnection(async (prevState:any, formData: FormData) => {
  const {storeId, storeName, logo} = Object.fromEntries(formData);

  // STEP 1) pass in ONLY the editable data:
    await Store.findByIdAndUpdate(storeId, {
      storeName,
    });
    // STEP 2) revalidate the path
    revalidatePath("/dashboard/myStore");
  }
);

export const publishStore = withDBConnection(async (storeId) => {
  await Store.findByIdAndUpdate(storeId, {
    status:"active"
  });
});

export const deleteStore = withDBConnection(async (storeId) => {
  await Store.findByIdAndDelete(storeId);

  //TODO: delete its products and categories in post hook
});
