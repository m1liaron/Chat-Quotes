import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDb } from "../db/connectMongoDb.js";
import { validateEnvVariables } from "../helpers/validateEnvVariables.js";
import { registerRoutes } from "../helpers/helpers.js";
import Message from "../models/Message.model.js"
import getRandomQuote from "./getRandomQuote.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { socketAuthMiddleware } from "../middlewares/socketAuthMiddleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

dotenv.config();
app.use(express.json());
app.use(cors());

registerRoutes(app);

const port = process.env.PORT || 4000;

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  console.log("Client connected via Socket.IO:", socket.id)
  
  socket.on("sendMessage", async (message) => {
    await Message.create({
      ...message,
      userId: socket.user.userId
    });
    const randomQuote = await getRandomQuote();

    const responseData = {
      text: `${randomQuote.quote} \n - ${randomQuote.author}`,
      time: new Date().toLocaleString(),
      chatId: message.chatId,
      userId: "server"
    };

    const serverMessage = await Message.create(responseData);
    socket.emit("receiveMessage", serverMessage);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
 });
});

(async () => {
   try {
      
      validateEnvVariables();
      await connectMongoDb();
      server.listen(port, () => {
        console.log(`HTTP + Socket.IO server running on port: ${port}...`);
      });
    } catch(error) {
        console.error("Error starting server: ", error);
    }
})();