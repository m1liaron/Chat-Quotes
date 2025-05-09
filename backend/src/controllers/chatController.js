import { StatusCodes } from "http-status-codes";
import Chat from "../models/Chat.model.js";
import Message from "../models/Message.model.js";

const getChats = async (req, res) => {
    try {
        const chats = await Chat.find();

        res.status(StatusCodes.OK).json(chats);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: error || "Server error" });
  }
};

const getChat = async (req, res) => {
    try {
        const { chatId } = req.params
        const chat = await Chat.findById(chatId);

        res.status(StatusCodes.OK).json(chat);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: error || "Server error" });
  }
};

const getChatMessages = async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await Message.find({ chatId });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
}

const createChat = async (req, res) => {
    try {
        const { firstName, lastName, userId } = req.body;
        if (!firstName?.trim() || !lastName?.trim() || !userId?.trim()) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "firstName and lastName are required.",
          });
        }

        const newChat = await Chat.create({ firstName, lastName, userId });
        res.status(StatusCodes.OK).json(newChat);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: true, message: error || "Server error" });
    }
}
const updateChat = async (req, res) => {
    try {
        const { 
            params: { chatId },
            body: { firstName, lastName }
        } = req;
      
        
        if ((firstName && !firstName.trim()) || (lastName && !lastName.trim())) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: true, message: "Names cannot be empty strings." });
        }
      const updatedChat = await Chat.findByIdAndUpdate(chatId, { firstName, lastName }, { new: true });
        if (!updatedChat) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: true, message: "Chat not found." });
        }
        
        res.status(StatusCodes.OK).json(updatedChat);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: true, message: error || "Server error" });
    }
};
const removeChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const removed = await Chat.findByIdAndDelete(chatId);

        if (!removed) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: true, message: "Chat not found." });
        }

        res
            .status(StatusCodes.OK)
            .json({ error: false, message: "Chat deleted successfully." });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error || "Server error"});
    }
};

export {
    getChats,
    getChat,
    getChatMessages,
    createChat,
    updateChat,
    removeChat
}