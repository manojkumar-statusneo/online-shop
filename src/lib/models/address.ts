import { Schema, model, models } from "mongoose";

const AddressSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
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
          pinCode: {
            type: Number,
            required: true,
          },
          phoneNo: {
            type: Number,
            required: true,
          },
        user: {
          type:Schema.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      })
      const Address = models.Address || model("Address", AddressSchema);

export default Address;