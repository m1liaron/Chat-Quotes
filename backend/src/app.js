import express from "express";
import http from "http";
import { WebSocketServer } from "ws"
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDb } from "./db/connectMongoDb.js";
import { validateEnvVariables } from "./helpers/validateEnvVariables.js";
import { registerRoutes } from "./helpers/helpers.js";

const app = express();
const server = http.createServer(app);

dotenv.config();
app.use(express.json());
app.use(cors());

registerRoutes(app);

const port = process.env.PORT || 4000;

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");
  
  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    ws.send(`Server received: ${message}`);
  });

 ws.on("close", () => {
   console.log("Client disconnected");
 });
});

(async () => {
   try {
      
      validateEnvVariables();
      await connectMongoDb();
      server.listen(port, () => {
        console.log(`HTTP + WebSocket server running on port: ${port}...`);
      });
    } catch(error) {
        console.error("Error starting server: ", error);
    }
})();