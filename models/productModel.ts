import { Model, Schema, model, models } from "mongoose";
import { ProductDocument } from "@/_Types/Product";

type ProductModel = Model<ProductDocument>;

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, "the name field is required"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "the price field is required"],
    },
    quantity: {
      type: Number,
      required: [true, "the quantity field is required"],
    },
    image: {
      type: [String],
      required: [true, "the image field is required"],
    },
    category: [Schema.Types.ObjectId],
    description: {
      type: String,
      required: [true, "the description field is required"],
    },
    status: {
      type: String,
      enum: ["inStock", "outOfStock"],
      required: [true, "the productStatus is required"],
    },
    discount: {
      // NOTE: the user insert the number to be in %
      type: Number,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "each product must belong to a store"],
    },
    numberOfPurchases: {
      //TODO: this counter should be increased once the users completed their payment process
      type: Number,
      default: 0,
    },
    ranking: {
      // TODO: this filed will be use to presents the ranking of store's products, it's irrelevant to the storeStats model.
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "reviewedModel",
});

productSchema.index({ ranking: 1 });

const Product =
  models?.Product ||
  model<ProductDocument, ProductModel>("Product", productSchema);

export default Product;
