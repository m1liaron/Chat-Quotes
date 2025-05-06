import React from "react";
import "./ChatItem.css";

interface ChatItemProps {
    firstName: string;
    lastName: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ firstName, lastName }) => {
    return (
        <div className="chat-item">
            <img src="https://via.placeholder.com/40" alt="Avatar" />
            <div className="chat-info">
                <strong>{firstName} {lastName}</strong>
                {/* {message && <p>{message}</p>} */}
            </div>
            {/* {date && <span className="chat-date">{date}</span>} */}
        </div>
    )
}

export { ChatItem };  