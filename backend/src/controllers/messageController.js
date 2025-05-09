import { StatusCodes } from "http-status-codes"
import Message from "../models/Message.model.js";

const updateMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { messageId } = req.params;
        if (!text.trim()) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Text not found")
            return;
        }
        const updatedMessage = await Message.findByIdAndUpdate(messageId, { text }, { new: true });
        if (!updatedMessage) {
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json("Message not found");
            return;
        }
    } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error || "Server error" });
    }
}

export { updateMessage };