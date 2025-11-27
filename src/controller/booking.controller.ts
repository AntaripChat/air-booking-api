import { Request, Response } from "express";
import bookingService from "../services/booking.service";

export class BookingController {
  async bookSeat(req: Request, res: Response) {
    try {
      const { scheduleId, seatNumber } = req.body;

      if (!scheduleId || !seatNumber) {
        return res.status(400).json({ success: false, message: "scheduleId and seatNumber required" });
      }

      const booking = await bookingService.bookSeat(
        scheduleId,
        seatNumber,
        req.user!.id
      );

      res.status(201).json({ success: true, data: booking });

    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
