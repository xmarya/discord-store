import { Types } from "mongoose";


export interface ReviewBasic {
    user:Types.ObjectId,
    reviewBody:string,
    wroteAt:Date,
    updatedAt:Date,
    reviewedModel:Types.ObjectId,
    reviewType: "Product" | "Store" | "Platform"

}

export type ReviewDocument = ReviewBasic;