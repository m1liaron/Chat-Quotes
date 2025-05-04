import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    text: { type: String, required: true },
    chatId: { type: String, required: true },
    userId: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Chat = model("User", MessageSchema);
export default Chat;
