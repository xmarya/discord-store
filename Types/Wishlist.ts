import { Types } from "mongoose";


export interface Wishlist {
    user:Types.ObjectId,
    product:Types.ObjectId
}

export type WishlistDocument = Wishlist;