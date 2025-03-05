"use server"

import User from "@/models/userModel";
import { withDBConnection } from "@/utils/controllerWrapper";
import mongoose from "mongoose";


export const getAll= withDBConnection(async(Model:string, filter?:{}) => {

});

// NOTE: I decided to split the get/update controllers into one for the Auth and the another for the remaining models
//      as I can only search for the users using their email that comes from the discord auth
//      If I used a controller called getOne() for all of the models then I would have had to write an if-else to
//     determine whether to use find({email}) or findById().
export const getUser = withDBConnection( async(email: string) => {
  console.log(email);
  const user = await User.find({discordEmail: email});
  console.log(user);

  return JSON.parse(JSON.stringify(user)); // NOTE: to convert the _id:new ObjectId('67c43f535c8da8d1edff3aa1') to be a string
  
});

export const getMyStore = withDBConnection( async(userId: string) => {
  // NOTE: get my store(for the owner and the assistant) is different from get store (for other users to view/shop)
  const userStore = await User.findById(userId).select("myStore");
  if(!userStore) return null;

  console.log("getMyStore", userStore);

  return JSON.parse(JSON.stringify(userStore));
})


export const getOne = withDBConnection( async(Model: string, id: string) => {
  const doc = await mongoose.model(Model).findById(id);
  return doc;
  
});

export const updateOne = withDBConnection( async(Model:string, id:string, formDate:FormData) => {

});
