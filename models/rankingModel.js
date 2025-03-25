import { Schema, model } from "mongoose";

const rankingSchema = new Schema({
    // ranking for the store and the products
},
{timestamps: true, strictQuery:true, strict: true},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Ranking = model("Ranking", rankingSchema);

export default Ranking;