import React from "react";

interface ChatItemProps {
    firstName: string;
    lastName: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ firstName, lastName }) => {
    return (
        <>
            <img />
            <h3>{firstName} {lastName}</h3>
        </>
    )
}

export { ChatItem };  