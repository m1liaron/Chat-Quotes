import { authRoute } from "../routes/routes.js";

const registerRoutes = (app) => {
    app.use("/auth", authRoute);
}

export { registerRoutes };