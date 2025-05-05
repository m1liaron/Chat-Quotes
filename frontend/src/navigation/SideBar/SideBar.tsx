import React, { useEffect, useState } from "react";
import { Chat } from "../../common/types/Chat";
import axios from "axios";
import { ChatItem } from "../../components/ChatItem/ChatItem";

const SideBar: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const getChats = async () => {
            const response = await axios.get("http://localhost:3000/chats");
            setChats(response.data);
        }
        getChats();
    }, []);
    
    return (
        <ul>
            {chats.map(chat => <ChatItem {...chat} key={chat._id}/>)}
        </ul>
    )
}

export { SideBar };  