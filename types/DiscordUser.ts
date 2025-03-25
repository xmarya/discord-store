import {Types} from "mongoose"


export interface DiscordUser {
    _id: Types.ObjectId,
    id:string
    name:string,
    email:string,
    image:string,
    userType:string
}