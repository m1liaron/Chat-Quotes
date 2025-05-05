import React from "react";
import "./MainPage.styles.css";
import { SideBar } from "../../navigation/SideBar/SideBar";
import { Dialog } from "../../components/Dialog/Dialog";

const MainPage: React.FC = () => {
    return (
        <>
            <SideBar />
            <Dialog/>
        </>
    )
}

export { MainPage };  