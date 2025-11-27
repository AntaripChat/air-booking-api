import { Request, Response } from "express";
import aircraftService from "../services/aircraft.service";

export class AircraftController {
  async addAircraft(req: Request, res: Response) {
    try {
      const { name, code, seats, price } = req.body;

      if (!name || !code || !seats || !price) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const aircraft = await aircraftService.createAircraft({
        name,
        code,
        seats,
        price
      });

      res.status(201).json({ success: true, data: aircraft });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAircrafts(req: Request, res: Response) {
    try {
      const data = await aircraftService.getAllAircrafts();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
