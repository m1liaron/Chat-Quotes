import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 4000;

(async () => {
    try {
		app.listen(port, () => {
			console.log(`Server running on port: ${port}...`);
		});
    } catch(error) {
        console.error("Error starting server: ", error);
    }
})();