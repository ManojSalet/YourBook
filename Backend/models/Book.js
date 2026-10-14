import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      default: 10,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        // Provide both image and imageUrl for frontend compatibility
        ret.image = ret.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600";
        if (ret.category && typeof ret.category === "object" && ret.category._id) {
          ret.category.id = ret.category._id.toString();
          ret.categoryId = ret.category._id.toString();
        } else if (ret.category) {
          ret.categoryId = ret.category.toString();
        }
        return ret;
      },
    },
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;

