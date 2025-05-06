import React from "react";
import "./ChatWindow.css";
import { MessageBubble } from "../MessageBubble/MessageBubble";

const ChatWindow: React.FC = () => {
    return (
        <div className="chat-window">
            <div className="chat-header">
                <img src="https://via.placeholder.com/40" alt="Avatar" />
                <span>Alice Freeman</span>
            </div>
            <div className="messages">
                <MessageBubble text="Hi, how are you?" time="8/17/2022, 7:43 AM" left />
                <MessageBubble
                    text="Not bad. What about you?"
                    time="8/17/2022, 7:45 AM"
                />
                <MessageBubble
                    text="How was your meeting?"
                    time="8/17/2022, 7:48 AM"
                />
            </div>
        </div>
    )
}

export { ChatWindow };  