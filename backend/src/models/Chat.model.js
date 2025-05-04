

import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
  },
);

const User = model("User", ChatSchema);
export default User;