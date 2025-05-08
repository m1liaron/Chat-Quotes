import User from "../models/User.model.js";
import { StatusCodes } from "http-status-codes";
import { OAuth2Client } from "google-auth-library";
import { envVariables } from "../common/envVariables.js";

const googleClient = new OAuth2Client(envVariables.GOOGLE_API_CLIENT_ID)

const googleLogin = async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing Google credential" });
  }
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: envVariables.GOOGLE_API_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid Google ID token");
    }
    const {
      sub: googleId,
      email,
      given_name: firstName,
      family_name: lastName,
      picture: avatar,
    } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        googleId,
        avatar,
      });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token });
    }
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Google authentication failed" });
  }
}

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
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

      const user = await User.create({ firstName, lastName, email, password });
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

export { register, login, googleLogin };
