import express, { Express } from "express";
import indexRoutes from "./routes/index";

const app: Express = express();
app.use(express.json());

indexRoutes(app);

export default app;
