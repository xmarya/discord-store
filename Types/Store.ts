import { Types } from "mongoose";
import { Category } from "./Category";
import { ProductDocument } from "./Product";
import { ReviewDocument } from "./Reviews";


export interface StoreBasic {
    storeName:string,
    owner:Types.ObjectId,
    status: "inProgress"| "active"| "suspended"| "deleted",
    verified:boolean
}

export interface StoreOptionals {
    storeAssistants?:Array<Types.ObjectId>
    categories?:Array<Category>,
    colourTheme?:Types.ObjectId, // reference to one of the themes that defined inside ColourTheme Model, the user is going to select one theme
    products?:Array<ProductDocument>,
    state?:Array<string>,
    reviews?:Array<ReviewDocument>
}

export type StoreDocument = StoreBasic & StoreOptionals;