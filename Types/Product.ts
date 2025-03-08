import { Types } from "mongoose";
import { Category } from "./Category";

export interface ProductBasic {
  _id:string,
  name: string;
  price: number;
  quantity: number;
  image: Array<string>;
  category: Array<Category>;
  description: string;
  status: "inStock" | "outOfStock";
  store: Types.ObjectId;
}

export interface ProductOptionals {
  discount?: number;
  numberOfPurchases?: number;
  ranking?: number;
  reviews?:string
}

export type ProductDocument =  ProductBasic & ProductOptionals;
