import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
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
    username: {
        type: String,
        required: [true, "the username field is required"],
        unique: true,
        trim: true
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
    subscribedPlanDetails: {
        name: {
            type: String,
            enum: ["basic", "plus","unlimited", "none"],
            required: [true, "the registeredPlan field is required"],
            // NOTE: I highly recommending this to be embeded document 1-1 relationship
            default: "none", // since the user first will signin using discord, the info of this field won't be available, so we'll set it to 'none' temporarily
        },
        price: {
            type: Number,
            required: [true, "the registeredPlan field is required"],
            default: 0
        },
        subscribeStarts: {
            // TODO: pre("save") hook to set the start time
            type: Date,
        },
        subscribeEnds: {
            // TODO:this field should be calculated the moment the subscribeStarts field is initialised or updated
            // using pre(save/update) hook.
            // PLUS, it doesn't need any recalculation that's why I didn't make it a virtual filed
            type: Date,
        },
    },
    pastSubscriptions: [{
        // TODO: the logic of implementing this field and the filed that holds the time of subscribeStarts
        // it should be only updated by checking the plan name and making the count + 1
        //  once the subscribeStarts property updated
        plan: {
            type: String,
            enum: ["basic", "plus", "unlimited"],
            required:true,
        },
        count: {
            type: Number,
            required:true,
            default: 1
        },
        // select: false
    }],
    myStore:{
        type: Schema.Types.ObjectId,
        ref: "Store"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
        select: false // excluding this filed from the find* queries.
    },

    // purchases: {
    //     // reference to the user
    //     // reference to the products (each of them has a reference to the user it belongs to)
        //NOTE: remove this filed from here, THIS WILL BE ACCESSIBLE BY QUERYING THE invoiceModel by userId
    // },
},
{timestamps: true, strictQuery:true, strict: true},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// I decided to make this a virtual field, so it will be created and recalculated each time
// the data is retrieved which maintains the accuracy of how many days exactly are left.
userSchema.virtual("planExpiresInDays").get(function(){
    return this.subscribeEnds - this.subscribeStarts;
    /* CHANGE LATER: this must be changed to pre("save") hook since 
    I moved the subscribeEnds from Top-level field to be inside the planDetails object 
        OR MAYBE NOT??? LET'S TRY IT FIRST THEN DECIDE 👍🏻*/
});

const User = models?.User || model("User", userSchema);

export default User;