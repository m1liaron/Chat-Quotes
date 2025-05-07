import axios from "axios";
import { envVariables } from "../common/envVariables.js";

const api = "https://api.api-ninjas.com/v1/quotes";

const getRandomQuote = async () => {
    try {
        console.log("Send to api")
        const response = await axios.get(api, {
            headers: {
                "X-Api-Key": envVariables.API_KEY_NINJAS
            }
        });
        console.log(response);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}

export default getRandomQuote;