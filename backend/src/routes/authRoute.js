import express from "express";
const router = express.Router();

import { register, login, googleLogin } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin)

export { router as authRoute };