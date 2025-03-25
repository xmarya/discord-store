"use server";

import User from "@/models/userModel";
import { withDBConnection } from "@/_utils/controllerWrapper";
import mongoose, { Document } from "mongoose";
import { UserDocument } from "@/_Types/User";
import { DOCS_PER_PAGE } from "@/_data/constants";
import { Model } from "@/_Types/Model";

export const getAll = withDBConnection(async <T> (Model: Model, filter = {}):Promise<Array<T>> => {
  console.log("getAll");
  let docs = await mongoose.model(Model).find(filter).limit(DOCS_PER_PAGE);

  return JSON.parse(JSON.stringify(docs));
});

// NOTE: I decided to split the get/update controllers into one for the Auth and the another for the remaining models
//      as I can only search for the users using their email that comes from the discord auth
//      If I used a controller called getOne() for all of the models then I would have had to write an if-else to
//     determine whether to use find({email}) or findById().

export const getUserByEmail = withDBConnection(async (email: string, select?: string): Promise<UserDocument | null> => {
  console.log("getUserByEmail");
  const user = await User.findOne({ email });
  /* OLD CODE (kept for reference): 
    // return JSON.parse(JSON.stringify(user)); 
    // // NOTE: to convert the _id:new ObjectId('67c43f535c8da8d1edff3aa1') to be a string
     converting the Mongoose document to a plain object with JSON.parse(JSON.stringify(user)), 
     strips off the document’s prototype (and hence its instance methods). 
     This is why calling user.comparePasswords results in “not a function” – the plain object no longer has 
     the method defined on the schema.
  */

  return user;
});

export const getMyStore = withDBConnection(async (userId: string) => {
  // NOTE: get my store(for the owner and the assistant) is different from get store (for other users to view/shop)
  const userStore = await User.findById(userId).select("myStore");
  if (!userStore) return null;

  /* OLD CODE (kept for reference): 
    return userStore; // decided to get rid of double JSON to not lose the schema native methods,statics in case I needed it
    this return cause RangeError: Maximum call stack size exceeded
    at String.replace (<anonymous>) {
    digest: '1577444677'
    because mongoose docs aren't plain objects, they must be serialised and this may lead to infinite loop 
}
  */
//  return userStore.toObject();
return JSON.parse(JSON.stringify(userStore));
});

export const getField = withDBConnection(async (Model: string, field: string): Promise<Array<Record<string, any>>> => {
  console.log("getField");
  const docs = await mongoose.model(Model).find().select(field);
  return JSON.parse(JSON.stringify(docs));
});

export const getOneById = withDBConnection(async (Model: string, id: string) => {
  console.log("getOneById");
  const doc = await mongoose.model(Model).findById(id);
  return doc;
});

export const updateOne = withDBConnection(async (Model: string, id: string, formDate: FormData) => {
  console.log("updateOne");
  // NOTE: this one needs a validation on the front-end, since I don't know which Model is being updated
});
