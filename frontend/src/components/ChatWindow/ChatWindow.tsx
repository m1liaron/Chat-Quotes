import React, { useEffect, useState } from "react";
import "./ChatWindow.css";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { Message } from "../../common/types/Message";
import { io, Socket } from "socket.io-client";
import { Chat } from "../../common/types/Chat";
import axios from "axios";

let socket: Socket;

interface ChatWindowProps {
    chat?: Chat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        socket = io("http://localhost:3000");

        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("receiveMessage", (data: Message) => {
            console.log("Received message from server:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
            if (chat) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });

          return () => {
            socket.disconnect();
          };
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!chat?._id) return;
            try {
                const res = await axios.get<Message[]>(`http://localhost:3000/chats/${chat._id}/messages`);
                setMessages(res.data);
            } catch (error) {
                 console.error("Error fetching messages:", error);
            }
        }

        fetchMessages();
    }, [chat]);

    const sendMessage = () => {
        if (!chat?._id) return;
        if(!inputValue.trim()) return;

        const message: Message = {
            text: inputValue,
            time: new Date().toLocaleString(),
            chatId: chat?._id
        }

        setMessages((prev) => [...prev, message]);
        socket.emit("sendMessage", message);
        setInputValue("");
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            sendMessage();
        }
    }

    if (!chat) {
        return (
            <div className="chat-window placeholder">
                <h2>Select a chat to start messaging</h2>
            </div>
        );
    }
 
    return (
        <div className="chat-window">
            <div className="chat-header">
                <img src="*" alt="Avatar" />
                <span>{chat?.firstName} {chat?.lastName}</span>
            </div>
            <div className="messages">
                {messages.map((message) => <MessageBubble key={message._id || message.chatId} text={message.text} time={message.time}/>)}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={handleKeyPress}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export { ChatWindow };  