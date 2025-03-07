import { Types } from "mongoose";

export interface StoreState {
  store: Types.ObjectId;
  date: Date;
  daily: number;
  weekly: number;
  monthly: number;
  annual: number;
  totalProfit: number;
}

export type StoreStateDocument = StoreState;