import { Express } from "express";
import { BookingController } from "../controller/booking.controller";
import { auth } from "../middleware/auth";

const bookingRoutes = (app: Express) => {
  const controller = new BookingController();

  // User or Admin can book a seat
  app.post("/api/book-seat", auth(["user", "admin"]), controller.bookSeat.bind(controller));
};

export default bookingRoutes;
