import { Express } from "express";
import userRoutes from "./user.routes";
import aircraftRoutes from "./aircraft.routes";
import scheduleRoutes from "./schedule.routes";
import bookingRoutes from "./booking.routes";


const indexRoutes = (app: Express) => {
  userRoutes(app);
  aircraftRoutes(app);
  scheduleRoutes(app);
  bookingRoutes(app);
};

export default indexRoutes;
