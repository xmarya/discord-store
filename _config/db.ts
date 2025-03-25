import mongoose from "mongoose";
import { AppError } from "@/_utils/AppError";

let isConnected = false;

export async function dbStartConnection() {
  mongoose.set("strictQuery", true);
  // because the NEXT.js and vercel are serverless
  // we have to check the connection be fore establishing one.
  if (isConnected) {
    console.log("already connected");
  }

  try {
    // for connecting to MongoDB Atlas, TLS/SSL is enabled by default.
    // const db = process.env.NODE_ENV === "production" ? process.env.DB_ATLAS : process.env.LOCAL_DB;
    const db: string = process.env.LOCAL_DB as string;
    await mongoose.connect(db);
    isConnected = true;
    console.log("the db is connected...");
  } catch (error) {
    console.error("couldn't establish a connection with the db.", error);
    throw new AppError(500, (error as AppError).message);
  }
}
