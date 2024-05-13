import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { required: false, type: String, unique: false },
        email: { required: true, type: String, unique: true },
        mobile: { required: true, type: String, unique: true },
        password: { required: true, type: String },
        isAdmin: { type: Boolean, default: false },
      },
      {
        timestamps: true,
      },)
      const User = models.User || model("User", UserSchema);

export default User;