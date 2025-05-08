import React from "react";
import "./ChatItem.css";
import { Chat } from "../../common/types/Chat";
import { useChats } from "../../contexts/ChatsProvider";

interface ChatItemProps {
    item: Chat,
    setChat: (chat: Chat) => void
}

const ChatItem: React.FC<ChatItemProps> = ({ item }) => {
    const { setChat } = useChats();
    const { firstName, lastName } = item;
    return (
        <div className="chat-item" onClick={() => setChat(item)}>
            <img src="*" alt="Avatar" />
            <div className="chat-info">
                <strong>{firstName} {lastName}</strong>
                {/* {message && <p>{message}</p>} */}
            </div>
            {/* {date && <span className="chat-date">{date}</span>} */}
        </div>
    )
}

export { ChatItem };  