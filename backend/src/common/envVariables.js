import dotenv from "dotenv";
dotenv.config();

const envVariables = {
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_LIFETIME: process.env.JWT_LIFETIME || "1d",
};

export { envVariables };