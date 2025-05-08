import mongoose from "mongoose";
import { envVariables } from "../common/envVariables.js";

const connectMongoDb = async () => {
    try {
        mongoose.connect(envVariables.MONGO_URI);
        console.log("Connected to MongoDB🟩🟩🟩🟩")
    } catch (error) {
        console.error("Connection to Database went error: ", error);
        process.exit(1);
    }
}

export { connectMongoDb  };