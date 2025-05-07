import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDb } from "./db/connectMongoDb.js";
import { validateEnvVariables } from "./helpers/validateEnvVariables.js";
import { registerRoutes } from "./helpers/helpers.js";
import Message from "./models/Message.model.js"

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

io.on("connection", (socket) => {
  console.log("Client connected via Socket.IO:", socket.id)
  
  socket.on("sendMessage", async (message) => {
    const message = await Message.create(message);

    socket.emit("receiveMessage", {
      _id: Date.now().toString(),
      text: `Server received: ${message}`,
      time: new Date().toLocaleString()
    })

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