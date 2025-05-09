import React, { useEffect, useState } from "react";
import "./ChatWindow.css";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { Message } from "../../common/types/Message";
import { io, Socket } from "socket.io-client";
import { serverApi } from "../../common/app/ApiPath";
import { useChats } from "../../contexts/ChatsProvider";
import { useUser } from "../../contexts/UserProvider";
import NotificationSound from "../../assets/audio/notification.mp3";
import { apiClient } from "../../api/apiClient";
import { Chat } from "../../common/types/Chat";

let socket: Socket;

const ChatWindow = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { chat, setChat, chats, setChats } = useChats();  
    const { user } = useUser();

    useEffect(() => {
        if (chat) {
            setFirstName(chat.firstName);
            setLastName(chat.lastName);
        }
    }, [chat]);

    useEffect(() => {
        socket = io(serverApi, {
            auth: {
                token: localStorage.getItem("token")
            }
        });

        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("receiveMessage", (data: Message) => {
            console.log("Received message from server:", data);
            setMessages((prevMessages) => [...prevMessages, data]);

            if (data?.userId !== user?._id) {
                const audio = new Audio(NotificationSound);

                audio.play();
                Notification.requestPermission().then(permission => {
                    if(permission === "granted") {
                        new Notification("New Message", { body: data.text })
                    }
                })
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
                const data = await apiClient.get<Message[]>(`${serverApi}/chats/${chat._id}/messages`);
                setMessages(data);
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
            chatId: chat?._id,
            userId: user?._id
        }

        socket.emit("sendMessage", message);
        setInputValue("");
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            sendMessage();
        }
    }

    const updateChat = async () => {
        const data: Chat = await apiClient.put<Chat>(`/chats/${chat?._id}`, { firstName, lastName });
        const updatedChats = [...chats];
        const updatedChatId = chats.findIndex(ch => ch._id === chat?._id);
        updatedChats[updatedChatId] = data;
        setChats(updatedChats)
    }

    const removeChat = async () => {
        const sure = confirm("Are you sure you want to delete this chat?");
        if (sure) {
            await apiClient.delete<Chat>(`/chats/${chat?._id}`);
            setChat(null);
            setChats(chats.filter(ch => ch._id !== chat?._id))
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
                <div>
                    <img src="*" alt="Avatar" />
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="chat__user__name"/>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="chat__user__name" />
                    <button onClick={updateChat}>Update</button>
                </div>

                <button className="chat__remove__button" onClick={removeChat}>Remove Chat</button>
            </div>
            <div className="messages">
                {messages.map((message) => <MessageBubble key={message._id || message.chatId} id={message._id || ""} text={message.text} time={message.time} left={message.userId !== user?._id} userId={message.userId || ""} />)}
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