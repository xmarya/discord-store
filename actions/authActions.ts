"use server";

import { auth, signIn } from "@/config/auth";
import { withDBConnection } from "@/utils/controllerWrapper";
import User from "@/models/userModel";
import Store from "@/models/storeModel";
import { FormState } from "@/Components/Blocks/StoreInfoForm";
import { CategoryBasic } from "@/Types/Category";

export async function discordSignIn() {
  await signIn("discord", { redirectTo: "/dashboard" });
}

export const createUserAuth = withDBConnection(async (newUser) => {
  console.log("before create", newUser);
  const user = await User.create({
    discordId: newUser.id,
    discordEmail: newUser.email,
    username: newUser.name,
    image: newUser.image,
  });
  console.log("createNewUser🎭", user.username);
  // NOTE: I think there is no need to return the newly created usr because the signIn callback only returns boolean
  // return user;
});

// export const createStore = withDBConnection( async(prevState: FormState, formData:FormData):Promise<FormState> => {
export const createStore = withDBConnection(async (formData: FormData) => {
  // the newStore probably if got from the formData, the userId from the session
  const session = await auth();
  const userId = session?.user.id;
  //1) create the new store:
  const newStore = await Store.create({
    storeName: formData.get("storeName"),
    owner: userId,
  });
  //2) link it with the user using userId:
  await User.findByIdAndUpdate(userId, { myStore: newStore._id });

  if (newStore)
    return {
      state: "success",
      message: "your store has been created",
    };
  else
    return {
      state: "fail",
      message: "something wen wrong while creating your store",
    };
});

export const updateUser = withDBConnection(
  async (id: string, formDate: FormData) => {
    // NOTE no need for updateUserAuth since it's related o the discord account, we only have a link with it
  }
);

export const createCategory = withDBConnection(
  async (category: CategoryBasic, storeId: string) => {
    // const session = await auth(); no need to fetch the userId => getUser(id) => get the storeId
  }
);
