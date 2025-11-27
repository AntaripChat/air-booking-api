import { Express } from "express";
import { ScheduleController } from "../controller/schedule.controller";
import { auth } from "../middleware/auth";

const scheduleRoutes = (app: Express) => {
  const controller = new ScheduleController();

  // Admin create schedule
  app.post("/api/schedule", auth(["admin"]), controller.createSchedule.bind(controller));

  // Public list schedules
  app.get("/api/schedules", controller.getSchedules.bind(controller));
};

export default scheduleRoutes;
