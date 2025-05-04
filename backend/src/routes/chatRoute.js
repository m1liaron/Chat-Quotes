import express from "express";
const router = express.Router();

import { createChat, updateChat, removeChat } from "../controllers/chatController.js";

router.route('/').post(createChat);
router.route('/chatId').patch(updateChat).delete(removeChat)

export { router as chatRoute };
