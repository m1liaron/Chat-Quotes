import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    text: { type: String, required: true },
    time: { type: String, required: true },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true
    },
    // userId: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", MessageSchema);
export default Message;
