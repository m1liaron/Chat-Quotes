import React, { useEffect, useState } from "react";
import "./ChatWindow.css";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { Message } from "../../common/types/Message";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            _id: "gfgfdg",
            text: "Hi, how are you?",
            time: "8/17/2022, 7:43 AM",
        },
        {
            _id: "gfgfdg35dwet",
            text: "How was your meeting?",
            time: "8/17/2022, 7:45 AM"
        }
    ]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        socket = io("http://localhost:3000");

        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("receiveMessage", (data: { text: string; time?: string; _id?: string }) => {
            console.log("Received message from server:", data);
            const newMessage: Message = {
                _id: data._id || Date.now().toString(),
                text: data.text,
                time: data.time || new Date().toLocaleString()
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

          return () => {
            socket.disconnect();
          };
    }, []);
 
    return (
        <div className="chat-window">
            <div className="chat-header">
                <img src="https://via.placeholder.com/40" alt="Avatar" />
                <span>Alice Freeman</span>
            </div>
            <div className="messages">
                {messages.map((message) => <MessageBubble text={message.text} time={message.time}/>)}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                />
            </div>
        </div>
    )
}

export { ChatWindow };  