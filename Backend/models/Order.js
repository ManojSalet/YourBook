import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PROCESSING",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        ret.user = { email: ret.userId };
        if (ret.items) {
          ret.items = ret.items.map((item) => ({
            id: item._id ? item._id.toString() : item.id,
            bookId: item.book?._id ? item.book._id.toString() : item.book?.id || item.book,
            book: item.book,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          }));
        }
        return ret;
      },
    },
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

