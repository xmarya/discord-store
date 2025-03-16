import { CategoryDocument } from "@/_Types/Category";
import { Model, model, models, Schema } from "mongoose";

type CategoryModel = Model<CategoryDocument>;
const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: [true, "the category name is required"],
  },
  colour: {
    type: String,
    required: [true, "the category colour is required"],
  },
  store: Schema.Types.ObjectId,
  products: [Schema.Types.ObjectId],
});
// ADD FEATURE: before allowing the user to add any category the plan's quota should be checked inside a pre("update") hook

const Category =
  models?.Category ||
  model<CategoryDocument, CategoryModel>("Category", categorySchema);

export default Category;
