import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    console.error("Socket auth failed:", error);
    next(new Error("Authentication failed"));
  }
};
