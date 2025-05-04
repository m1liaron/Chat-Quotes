import React, { useState } from "react";
import { ChatItem } from "../ChatItem/ChatItem";

const ChatList: React.FC = () => {
    const [chats, setChats] = useState([]);

    return (
        <ul>
            {chats.map((_, index) => <ChatItem key={index}/>)}
        </ul>
    )
}

export { ChatList };  