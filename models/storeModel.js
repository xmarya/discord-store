import { Schema, model, models } from "mongoose";

const storeSchema = new Schema({
  storeName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  /* OLD CODE (kept for reference): 
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // SOLILOQUY: 
    the slug is the same as the name, should I made the slug a virtual field ?
    or maybe remove it completely and just use the storeName filed to make the slug ?
    },

    WHY I DECIDED TO REMOVE IT?
    - storing the slug as a static field whiles it’s just a transformation of storeName could lead to 
    redundant data and extra updates when storeName changes.
    I could've made it a virtual field but I don't think it's necessary.
    
  */
  owner: {
    /* SOLILOQUY: the best way to relation these two is ...? embeded document , since there will be ONLY one owner, it's 1-1 relationship
    but wait? the users of course will going to update their data right? then that mean the data here might be stale..?
    */
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeAssistants: [
    {
      // relationship (child referencing) because it's 1-few relationship
      /* SOLILOQUY: not all stores will have an assistant right? so I'll make it a separate collection so the store docs won't get so large for nothing
                  also for scalability and future-proof that's better */
      type: Schema.Types.ObjectId,
      ref: "StoreAssistant",
      default: [], //is more intuitive than null.
    },
  ],
  /* OLD CODE (kept for reference): unique in an array doesn't enforce uniqueness across documents!!!
    categories: [{
      type: String,
      unique: true,
      colour: String,
      }],
      */

  categories: [
    {
      name: {
        type: String,
        required: [true, "the category name is required"],
        unique: true,
        trim: true,
      },
      colour: String,
      // ADD FEATURE: before allowing the user to add any category the plan's quota should be checked inside a pre("update") hook
    },
  ],
  colourTheme:
    {
      /* SOLILOQUY: this should be one object not an array, 
      of course the plus users can views many theme but eventually they are going to select only one*/
      type: Schema.Types.ObjectId,
      ref:"ColourTheme",
      // default:"default-theme" //SOLILOQUY:: is this how it should be defined ??

    },
  status: {
    type: String,
    enum: ["inProgress", "active", "suspended", "deleted"],
    required: [true, "the storeState is required"],
    default: "inProgress",
  },
});

storeSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "store",
});

storeSchema.virtual("stats", {
  ref:"StoreStat",
  localField: "_id",
  foreignField: "store"
});

storeSchema.virtual("reviews", {
  ref: "Review",
  localField:"_id",
  foreignField: "reviewedModel"
});

/* SOLILOQUY: I think the profits/stats should be virtual too */

const Store = models?.Store || model("Store", storeSchema);

export default Store;
