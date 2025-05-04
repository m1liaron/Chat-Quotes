import { StatusCodes } from "http-status-codes";
import Chat from "../models/Chat.model";

const createChat = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        if (!firstName?.trim() || !lastName?.trim()) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
              error: true,
              message: "firstName and lastName are required.",
            });
        }

        const newChat = await Chat.create({ firstName, lastName });
        res.status(StatusCodes.OK).json(newChat);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: true, message: error || "Server error" });
    }
}
const updateChat = async (req, res) => {
    try {
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: true, message: error || "Server error" });
    }
};
const removeChat = async (req, res) => {
    try {

    } catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error || "Server error"});
    }
};

export {
    createChat,
    updateChat,
    removeChat
}