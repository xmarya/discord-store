import { Types } from "mongoose";

export interface AnnualProfit {
    store: Types.ObjectId,
    year:string,
    totalProfit:number
}

export type AnnualProfitDocument = AnnualProfit;