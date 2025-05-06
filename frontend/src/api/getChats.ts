import axios from "axios"
import { Chat } from "../common/types/Chat";

const getChats = async (): Promise<Chat[]> => {
    const response = await axios.get("http://localhost:3000/chats");

    return response.data;
}

export { getChats };