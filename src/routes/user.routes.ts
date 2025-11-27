import { Express } from "express";
import { UserController } from "../controller/user.controller";

const userRoutes = (app: Express) => {
  const controller = new UserController();

  app.post("/api/register", controller.registerUser.bind(controller));
  app.post("/api/login", controller.loginUser.bind(controller));
};

export default userRoutes;
