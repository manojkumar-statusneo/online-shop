import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        shippingInfo: {
          address: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
      
          state: {
            type: String,
            required: true,
          },
      
          country: {
            type: String,
            required: true,
          },
          pinCode: {
            type: Number,
            required: true,
          },
          phoneNo: {
            type: Number,
            required: true,
          },
        },
        products: {
          type: Array,
          default: [],
        },
        user: {
          type:Schema.ObjectId,
          ref: "User",
          required: true,
        },
        order_id: {
          type: String,
          required: true,
        },
        shippingCharge: {
          type: Number,
          required: true,
          default: 0,
        },
        totalPrice: {
          type: Number,
          required: true,
          default: 0,
        },
        orderStatus: {
          type: String,
          required: true,
          default: "Processing",
        },
        deliveredAt: Date,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      })
      const Order = models.Order || model("Order", OrderSchema);

export default Order;