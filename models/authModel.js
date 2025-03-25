import { Schema, model, models } from "mongoose";

const authSchema = new Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    discordEmail: {
        type: String,
        required: true,
        unique: true,
    },
    discordName: {
        type: String,
        required: true,
    },
    userType: {
        /* SOLILOQUY: 
            this filed is shared between all the types of users, right?
            then should I move it to the global schema which is userSchema? not here in authSchema?
            However, since it's related to the auth operations/checking more than being a normal user data; it's better to
            keep it here and use it in authControllers.

            - SINCE the users are going to register using Discord account, once they logged I'll get the other details
            from the discord and fill in the User model. THIS WILL SOLVE THE problem

            - for the store assistant case, I will make the store owner to provide the assistant's discord account,
            check if it exist in our records, if it was there then OK, but what if it wasn't ?? 
            maybe should I only allow the owner to select someone who already exists in our records, 
            if not will pop-up a noti that the provided email is not exist, if there then the noti will be for the person who's been selected

            - it'll be so nice if there was a bot for the Saas that can send a notification to the assistant that it's been selected
            so they have to hurry and sign up in our Saas, but wait! CAN THE BOT send a message 
            to anyone without that person allowing it/adding it to their discord server?

            - Ok, then can I FORCE the store owner to give the necessary permissions to add the bot to their server?
            from this point the bot MAYBE can access to the assistant account/server and send a noti ?
        */
        type: String,
        enum: ["admin", "storeOwner", "storeAssistant", "user"], /* SOLILOQUY: what if the user can be both an owner and an assistant? in this case the type should be [String] */
        required: [true, "the userType field is required"],
        default: "user"
    },
    image:String,
    /* SOLILOQUY: 
        1- should I make it an array? because may be the user wants to add more than one card...?
        2- what about paypal/apple pay/google accounts? these shouldn't be saved in our side right?
            they should be dealt by the provider itself right?
     */

    // TODO: encrypt all the bankAccount info
    bankAccount: [{
        cardName: {
            type: String,
            required: true,
            trim: true,
        },
        cardNumber: {
            type: String,
            required: true,
            trim: true,
        },
        cardExpireIn: {
            month: {
                type: String,
                required: true,
                trim: true,
            },
            year: {
                type: String,
                required: true,
                trim: true,
            }
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        select: false // excluding this filed from the find* queries.
    },
});

const Auth = models?.Auth || model("Auth", authSchema);


export default Auth;