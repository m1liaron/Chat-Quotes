import express from "express";
const router = express.Router();

import { updateMessage } from "../controllers/messageController.js";

router.route("/:messageId").put(updateMessage);

export { router as messageRoute };
