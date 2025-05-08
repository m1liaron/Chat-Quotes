import React, { useEffect, useState } from "react";
import { Chat } from "../../common/types/Chat";
import axios from "axios";
import { ChatItem } from "../../components/ChatItem/ChatItem";
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
        </div>
    )
}

export { SideBar };  