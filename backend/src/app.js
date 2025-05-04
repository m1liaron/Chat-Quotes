import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDb } from "./db/connectMongoDb.js";
import { validateEnvVariables } from "./helpers/validateEnvVariables.js";
import { registerRoutes } from "./helpers/helpers.js";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

registerRoutes(app);

const port = process.env.PORT || 4000;

(async () => {
   try {
      
      validateEnvVariables();
      await connectMongoDb();
      app.listen(port, () => {
        console.log(`Server running on port: ${port}...`);
      });
    } catch(error) {
        console.error("Error starting server: ", error);
    }
})();