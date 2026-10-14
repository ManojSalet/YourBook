import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        ret.cartItems = (ret.items || []).map((item) => ({
          id: item._id ? item._id.toString() : item.id,
          book: item.book,
          quantity: item.quantity,
        }));
        return ret;
      },
    },
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

