import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // ensure one care per user
    },
    productsList:[{
        productId:{
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
    }],
},
{timestamps: true, strictQuery:true, strict: true},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

cartSchema.index({ user: 1 }, { unique: true });

cartSchema.virtual("total").get(function () {
    // NOTE: I decided to make the total a virtual files to prevent the staleness in case a product's price has changed
    // using this approach ig going to retrieve the VF total each time the users access their carts
    // IN ADDITION, this approach will save me time of manual recalculations ✨
    return this.productsList.reduce((sum, prod) => {
        const totalPrice = (prod.productBrief.price - prod.productBrief.discount) * prod.productBrief.quantity;
        return sum + totalPrice;
    }, 0);
});


const Cart = model("Cart", cartSchema);

export default Cart;
