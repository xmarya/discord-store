"use server"

import { dbStartConnection } from "@/config/db";
import Auth from "@/models/authModel";
import { AppError } from "@/utils/AppError";
import { withDBConnection } from "@/utils/controllerWrapper";
import mongoose from "mongoose";

export const createNewDoc = withDBConnection(async () => {
  console.log("createNewDoc");

});

export const getAll= withDBConnection(async(Model:string, filter?:{}) => {

});

// NOTE: I decided to split the get controller into one for the Auth and the another for the remaining models
//      as I can only search for the users using their email that comes from the discord auth
//      If I used a controller called getOne() for all of the models then I would have had to write an if-else to
//     determine whether to use find({email}) or findById().
export const getUser = withDBConnection( async(email: string) => {
  const user = await Auth.find({discordEmail: email});
  console.log("getUser", user);
  return user;
  
});

export const getOne = withDBConnection( async(Model: string, id: string) => {
  const doc = await mongoose.model(Model).findById(id);
  return doc;
  
});
