import React, { useEffect, useState } from "react";
import { Chat } from "../../common/types/Chat";
import axios from "axios";
import { ChatItem } from "../ChatItem/ChatItem";
import "./SideBar.css";

interface SideBarProps {
    setChat: (chat: Chat) => void
}

const SideBar: React.FC<SideBarProps> = ({ setChat }) => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const getChats = async () => {
            const response = await axios.get("http://localhost:3000/chats");
            setChats(response.data);
        }
        getChats();
    }, []);
    
    return (
        <div className="sidebar">
            <div className="top-bar">
                <div className="profile-icon"></div>
                <button className="login-btn">Log in</button>
            </div>
            <input
                type="text"
                placeholder="Search or start new chat"
                className="search-bar"
            />
            <div className="chat-list">
                {chats.map(chat => <ChatItem key={chat._id} item={chat} setChat={setChat} />)}
            </div>

            <button className="chat__add__button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            </button>
        </div>
    )
}

export { SideBar };  