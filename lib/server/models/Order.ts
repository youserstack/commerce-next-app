import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // type: mongoose.Types.ObjectId,
    },
    productInfo: {
      productId: String,
      imageUrl: String,
      options: Array,
    },
    delieveryInfo: {
      name: String,
      email: String,
      address: String,
      mobile: String,
      isDelivered: {
        type: Boolean,
        default: false,
      },
    },
    payInfo: {
      payerId: String,
      total: Number,
      method: String,
      payType: String,
      isPaid: {
        type: Boolean,
        default: false,
      },
      dateOfPayment: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
