import { Schema, model } from "mongoose";

const planSchema = new Schema({
    name: {
        type: String,
        enum: ["basic", "plus", "unlimited"],
        required:[true, "the name field is required"]
    },
    price: {
        type:Number,
        required: [true, "the price field is required"]
    },
    features:[String], /* SOLILOQUY:  not sure...*/
    quota:{
        ofProducts:{
            type: Number,
            required: true
        },
        ofCategories:{
            type: Number,
            required: true
        },
        ofStoreAssistants:{
            type: Number,
            required: true
        },
        ofColourThemes: {
            type: Number,
            required: true
        },
        ofCommission: {
            type: Number,
            required: true
        },
    },
    discount: {
        type:Number,
        default: 0.0
    },
    thisMonthSubscribers: {
        type:Number,
        default: 0
    },
    lastMonthSubscribers: {
        type:Number,
        default: 0
    },
});

const Plan = model("Plan", planSchema);

export default Plan;