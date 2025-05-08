import axios from "axios"
import { Chat } from "../common/types/Chat";
import { serverApi } from "../common/app/ApiPath";

const getChats = async (): Promise<Chat[]> => {
    const response = await axios.get(`${serverApi}/chats`);

    return response.data;
}

export { getChats };