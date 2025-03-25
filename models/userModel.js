import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userAuth: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "userAuth must be provided"]
    },
    username: {
        type: String,
        required: [true, "the username field is required"],
        unique: true,
        trim: true
    },
    userImage: String,
    subscribedPlanDetails: {
        name: {
            type: String,
            enum: ["basic", "plus","unlimited"],
            required: [true, "the registeredPlan field is required"],
            // NOTE: I highly recommending this to be embeded document 1-1 relationship
        },
        price: {
            type: Number,
            required: [true, "the registeredPlan field is required"],
        },
        subscribeStarts: {
            // TODO: pre("save") hook to set the start time
            type: Date,
            required: [true, "the subscribeStarts filed is required"]
        },
        subscribeEnds: {
            // TODO:this field should be calculated the moment the subscribeStarts field is initialised or updated
            // using pre(save/update) hook.
            // PLUS, it doesn't need any recalculation that's why I didn't make it a virtual filed
            type: Date,
            required: [true, "the subscribeEnds filed is required"]
        },
    },
    pastSubscriptions: [{
        // TODO: the logic of implementing this field and the filed that holds the time of subscribeStarts
        // it should be only updated by checking the plan name and making the count + 1
        //  once the subscribeStarts property updated
        plan: {
            type: String,
            enum: ["basic", "plus"],
            required:true,
        },
        count: {
            type: Number,
            required:true,
            default: 1
        },
        select: false
    }],
    myStore:{
        type: Schema.Types.ObjectId,
        ref: "Store"
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

const User = model("User", userSchema);

export default User;