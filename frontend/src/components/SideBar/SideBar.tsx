import React, { useEffect } from "react";
import axios from "axios";
import { ChatItem } from "../ChatItem/ChatItem";
import "./SideBar.css";
import { serverApi } from "../../common/app/ApiPath";
import { useChats } from "../../contexts/ChatsProvider";

const SideBar: React.FC = () => {
    const { setChat, chats, setChats } = useChats();

    useEffect(() => {
        const getChats = async () => {
            const response = await axios.get("http://localhost:3000/chats");
            setChats(response.data);
        }
        getChats();
    }, []);
    

    const createChat = () => {
        const newChatData = {
            firstName: "User firstname",
            lastName: "User lastname",
            userId: "681cb19dce5a78db6154c16a"
        }
        setChats(prev => [...prev, newChatData]);
        setChat(newChatData);
        axios.post(`${serverApi}/chats`, newChatData);
    }

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

            <button className="chat__add__button" onClick={createChat}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            </button>
        </div>
    )
}

export { SideBar };  