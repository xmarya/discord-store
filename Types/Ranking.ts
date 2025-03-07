import { Types } from "mongoose";


export interface Ranking {
    modelId: Types.ObjectId,
    model: "Store" | "Product",
    rank:number
}

export type RankingDocument = Ranking;