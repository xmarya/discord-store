"use server"

import { auth } from "@/config/auth";
import { withDBConnection } from "@/utils/controllerWrapper";
import Store from "@/models/storeModel";
import User from "@/models/userModel";
import { InitialState } from "@/Components/Blocks/StoreInfoForm";

export const createStore = withDBConnection(async (prevState:InitialState, formData: FormData) => {

  // the newStore probably if got from the formData, the userId from the session
  const session = await auth();
  const userId = session?.user.id;

  // 1) create the new store:
  const newStore = await Store.create({
    storeName: formData.get("storeName"),
    owner: userId,
  });
  
  // 2) link it with the user using userId:
  await User.findByIdAndUpdate(userId, { myStore: newStore._id });
});

export const updateStore = withDBConnection(async (prevState:InitialState, formData: FormData) => {
});