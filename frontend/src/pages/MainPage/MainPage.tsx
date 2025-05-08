import React, { useState } from "react";
import "./MainPage.styles.css";
import { SideBar } from "../../components/SideBar/SideBar";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";
import { Chat } from "../../common/types/Chat";

const MainPage: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);

    return (
        <>
            <SideBar setChat={setChat}/>
            <ChatWindow chat={chat} setChat={setChat} />
        </>
    )
}

export { MainPage };  