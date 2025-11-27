import { Request, Response } from "express";
import aircraftService from "../services/aircraft.service";
import { redis } from "../config/redis"; 

export class AircraftController {
  async addAircraft(req: Request, res: Response) {
    try {
      // Only admin can add
      if (req.user?.role !== "admin") {
        return res.status(403).json({ success: false, message: "Only admin can add aircraft" });
      }

      const { name, code, seats, price } = req.body;

      if (!name || !code || !seats || !price) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Add to DB
      const aircraft = await aircraftService.createAircraft({
        name,
        code,
        seats,
        price
      });

      // Clear Redis cache because new data added
      await redis.del("aircraft_list");

      res.status(201).json({ success: true, data: aircraft });

    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAircrafts(req: Request, res: Response) {
    try {
      // 1. Read from Redis cache
      const cached = await redis.get("aircraft_list");

      if (cached) {
        return res.status(200).json({
          success: true,
          source: "cache",
          data: JSON.parse(cached)
        });
      }

      // 2. Fetch from MongoDB
      const data = await aircraftService.getAllAircrafts();

      // 3. Save in Redis for 3600 seconds
      await redis.setEx("aircraft_list", 3600, JSON.stringify(data));

      return res.status(200).json({
        success: true,
        source: "database",
        data
      });

    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
