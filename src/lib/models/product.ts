import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
    {
        title: String,
        price: String,
        image: String,
        details: String,
        ratings: Number,
        qty: Number,
        category: {type:Schema.Types.ObjectId, ref:'Category'},
      },
      { timestamps: true })

      const Product = models.Product || model("Product", ProductSchema);

export default Product;