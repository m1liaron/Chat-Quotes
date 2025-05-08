import React from "react";
import "./MainPage.styles.css";
import { SideBar } from "../../components/SideBar/SideBar";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

const MainPage: React.FC = () => {
    return (
        <>
            <SideBar/>
            <ChatWindow />
        </>
    )
}

export { MainPage };  