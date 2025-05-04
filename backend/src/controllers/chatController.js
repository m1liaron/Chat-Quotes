import { StatusCodes } from "http-status-codes";

const createChat = async (req, res) => {
    try {
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