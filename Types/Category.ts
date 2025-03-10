import { Types } from "mongoose";


export type Category = {
  name: string;
  colour: string;
}

export interface CategoryBasic {
  name: string;
  colour: string;
  store:Types.ObjectId,
  products:Array<Types.ObjectId>
};

export type CategoryDocument = CategoryBasic;
