import { Request, Response } from "express";
import scheduleService from "../services/schedule.service";

export class ScheduleController {
  async createSchedule(req: Request, res: Response) {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ success: false, message: "Only admin can create schedule" });
      }

      const { aircraftId, date, time } = req.body;

      if (!aircraftId || !date || !time) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const schedule = await scheduleService.createSchedule(aircraftId, date, time);

      res.status(201).json({ success: true, data: schedule });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getSchedules(req: Request, res: Response) {
    try {
      const schedules = await scheduleService.getSchedules();
      res.status(200).json({ success: true, data: schedules });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
