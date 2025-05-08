import React from "react";

interface MessageBubbleProps {
    text: string;
    time: string;
    left?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, time, left }) => {
  return (
    <div className={`message ${left ? "left" : "right"}`}>
      <p>{text}</p>
      <span>{time}</span>
    </div>
  );
}

export { MessageBubble };
