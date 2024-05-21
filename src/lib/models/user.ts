import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        mobile: { required: true, type: String, unique: true },
        uid:{ required: true, type: String },
        isAdmin: { type: Boolean, default: false },
      },
      {
        timestamps: true,
      },)
      const User = models.User || model("User", UserSchema);

export default User;