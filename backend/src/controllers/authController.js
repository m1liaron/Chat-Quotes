import User from "../models/User.model.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing fields" });
      return;
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: `User with email: ${email}, already exist`,
      });
      return;
    }

      const user = await User.create({ username, email, password });
      const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: `Error during register: ${error}` });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing fields" });
      return;
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: true, message: `User with email: ${email}, not exist` });
      return;
    }

    const token = existUser.createJWT(existUser.id, existUser.username);

    res.status(StatusCodes.CREATED).json({ user: existUser, token });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: `Error during register: ${error}` });
  }
};

export { register, login };
