import { StatusCodes } from "http-status-codes";
import User from "../models/User.model.js";


const getUser = async (req, res) => {
  try {
    const { userId} = req.user

      const user = await User.findById(userId);

      res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: error || "Server error" });
  }
};

export { getUser };