"use server"

import Auth from "@/models/authModel";
import { withDBConnection } from "@/utils/controllerWrapper";
import mongoose from "mongoose";

export const createNewDoc = withDBConnection(async () => {
  console.log("createNewDoc");

});

export const getAll= withDBConnection(async(Model:string, filter?:{}) => {

});

// NOTE: I decided to split the get/update controllers into one for the Auth and the another for the remaining models
//      as I can only search for the users using their email that comes from the discord auth
//      If I used a controller called getOne() for all of the models then I would have had to write an if-else to
//     determine whether to use find({email}) or findById().
export const getUser = withDBConnection( async(email: string) => {

  const user = await Auth.find({discordEmail: email});
  // console.log("getUser", typeof user); // prints object
  return JSON.parse(JSON.stringify(user)); // NOTE: to convert the _id:new ObjectId('67c43f535c8da8d1edff3aa1') to be a string
  
});

export const updateUser = withDBConnection(async(email: string, formDate:FormData) => {
 // NOTE the updateUserAuth is going to be inside the authActions.ts
});

export const getOne = withDBConnection( async(Model: string, id: string) => {
  const doc = await mongoose.model(Model).findById(id);
  return doc;
  
});

export const updateOne = withDBConnection( async(Model:string, id:string, formDate:FormData) => {

});
