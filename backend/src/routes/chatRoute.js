import express from "express";
const router = express.Router();

import {
  getChats,
  getChat,
  createChat,
  updateChat,
  removeChat,
} from "../controllers/chatController.js";

router.route("/").get(getChats).post(createChat);
router.route("/chatId").get(getChat).patch(updateChat).delete(removeChat);

export { router as chatRoute };
