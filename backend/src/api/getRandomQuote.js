import axios from "axios";
import { envVariables } from "../common/envVariables.js";

const api = "https://api.api-ninjas.com/v1/quotes";

const getRandomQuote = async () => {
    try {
        const response = await axios.get(api, {
            headers: {
                "X-Api-Key": envVariables.API_KEY_NINJAS
            }
        });
        return response.data[0];
    } catch(error) {
        console.error(error);
    }
}

export default getRandomQuote;