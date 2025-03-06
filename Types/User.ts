import { Types } from "mongoose";
import { Plan } from "./Plan";


export interface UserPlan extends Plan {
    subscribeStarts?:Date,
    subscribeEnds?:Date,
}

export interface UserOptionals extends UserPlan {
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

export interface UserDocument extends UserOptionals {
    discordId: string;
    discordEmail: string;
    username: string;
    userType: string;
    image: string;
    createdAt:Date
  } 




