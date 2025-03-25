import { Schema, model } from "mongoose";

// only accessible by the Plus
const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products:[{ type: Schema.Types.ObjectId, ref:"Product"}]
},
{timestamps: true, strictQuery:true, strict: true},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

const Wishlist = model("Wishlist", wishlistSchema);

export default Wishlist;