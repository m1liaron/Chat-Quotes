import React from "react";
import "./ChatItem.css";

interface ChatItemProps {
    firstName: string;
    lastName: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ firstName, lastName }) => {
    return (
        <li className="navbar__list__item">
            <img />
            <h3>{firstName} {lastName}</h3>
        </li>
    )
}

export { ChatItem };  