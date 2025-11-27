import { Express } from "express";
import { AircraftController } from "../controller/aircraft.controller";
import { auth } from "../middleware/auth";

const aircraftRoutes = (app: Express) => {
  const controller = new AircraftController();

  // Admin only — add aircraft
  app.post("/api/aircraft", auth(["admin"]), controller.addAircraft.bind(controller));

  // Anyone — list all aircraft
  app.get("/api/aircraft", controller.getAircrafts.bind(controller));
};

export default aircraftRoutes;
