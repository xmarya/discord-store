import { Types } from "mongoose";
import { Plan } from "./Plan";

export interface UserBasic {
  discordId: string;
  discordEmail: string;
  username: string;
  userType: string;
  image: string;
  createdAt:Date
} 

export interface UserPlan extends Plan {
    subscribeStarts?:Date,
    subscribeEnds?:Date,
}

export interface UserOptionals {
    bankAccount?:[
        {
            cardName:string
            cardNumber:string,
            cardExpireIn: {
                month: string,
                year:string
            }
        }
    ],
    subscribedPlanDetails?:UserPlan,
    pastSubscriptions?:[{
        plan:string,
        count:number
    }],
    myStore?:Types.ObjectId,
}

export type UserDocument = UserBasic & UserOptionals & UserPlan;




