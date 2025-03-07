import { Types } from "mongoose";

export interface Cart {
  user: Types.ObjectId;
  productsList: [
    {
      productId: Types.ObjectId;
      name: string;
      price: number;
      image: string;
      quantity: number;
      discount?:number
    }
  ];
  total: number;
}

export type CartDocument = Cart;
