import { authMiddleware } from "../middlewares/authMiddleware.js";
import { chatRoute } from "../routes/chatRoute.js";
import { authRoute } from "../routes/routes.js";
import { userRoute } from "../routes/userRoute.js";

const registerRoutes = (app) => {
    app.use("/auth", authRoute);
    app.use("/chats", chatRoute);
    app.use("/users", authMiddleware, userRoute)
}

export { registerRoutes };