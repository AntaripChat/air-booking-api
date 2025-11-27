import { Express } from "express";
import userRoutes from "./user.routes";

const indexRoutes = (app: Express) => {
  userRoutes(app);
};

export default indexRoutes;
