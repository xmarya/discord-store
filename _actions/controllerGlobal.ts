"use server";

import User from "@/models/userModel";
import { withDBConnection } from "@/_utils/controllerWrapper";
import mongoose, { Document } from "mongoose";
import { UserDocument } from "@/_Types/User";

export const getAll = withDBConnection(
  async (Model: string, filter?: {}) => {}
);

// NOTE: I decided to split the get/update controllers into one for the Auth and the another for the remaining models
//      as I can only search for the users using their email that comes from the discord auth
//      If I used a controller called getOne() for all of the models then I would have had to write an if-else to
//     determine whether to use find({email}) or findById().
export const getUser = withDBConnection(async (email: string, select?:string):Promise<UserDocument | null> => {

  const user = await User.findOne({ email }).select(`userType ${select}`);
  /* OLD CODE (kept for reference): 
    // return JSON.parse(JSON.stringify(user)); // NOTE: to convert the _id:new ObjectId('67c43f535c8da8d1edff3aa1') to be a string
     converting the Mongoose document to a plain object with JSON.parse(JSON.stringify(user)), 
     strips off the document’s prototype (and hence its instance methods). 
     This is why calling user.comparePasswords results in “not a function” – the plain object no longer has 
     the method defined on the schema.
  */
  
  console.log("JUST BEFORE return user");  return user; 
});

export const getMyStore = withDBConnection(async (userId: string) => {
  // NOTE: get my store(for the owner and the assistant) is different from get store (for other users to view/shop)
  const userStore = await User.findById(userId).select("myStore");
  if (!userStore) return null;

  return JSON.parse(JSON.stringify(userStore));
});

export const getField = withDBConnection(async (Model: string, field: string): Promise<Array<Record<string, any>>> => {

    const docs = await mongoose.model(Model).find().select(field);
    return JSON.parse(JSON.stringify(docs));
  }
);

export const getOneById = withDBConnection(async (Model: string, id: string):Promise<Document | null> => {
  const doc = await mongoose.model(Model).findById(id);
  return doc;
});

export const updateOne = withDBConnection(
  async (Model: string, id: string, formDate: FormData) => {}
);
