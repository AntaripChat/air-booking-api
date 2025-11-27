import { Express } from "express";
import userRoutes from "./user.routes";
import aircraftRoutes from "./aircraft.routes";


const indexRoutes = (app: Express) => {
  userRoutes(app);
  aircraftRoutes(app);
};

export default indexRoutes;
