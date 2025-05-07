import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: true, message: "Authentication invalid"})
    return
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const findUser = await User.findById(payload.userId);
    req.user = {
      userId: payload.userId,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
    };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: true, message: "Authentication invalid"})
    return
  }
};

export { authMiddleware  };
