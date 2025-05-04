import dotenv from "dotenv";
dotenv.config();

const envVariables = {
    MONGO_URI: process.env.MONGO_URI || "",
}

export { envVariables };