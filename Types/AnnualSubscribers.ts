import { Types } from "mongoose";

export interface AnnualSubscribers {
    plan:Types.ObjectId,
    year:string,
    totalSubscribers:number
}

export type AnnualSubscribersDocument = AnnualSubscribers;