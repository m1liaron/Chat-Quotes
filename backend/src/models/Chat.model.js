

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

const Chat = model("Chat", ChatSchema);
export default Chat;