import { Schedule } from "../model/schedule.model";
import { Booking } from "../model/booking.model";

class BookingService {
  async bookSeat(scheduleId: string, seatNumber: number, userId: string) {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) throw new Error("Schedule not found");

    const seat = schedule.seats.find(s => s.seatNumber === seatNumber);
    if (!seat) throw new Error("Seat does not exist");
    if (seat.isBooked) throw new Error("Seat already booked");

    // Mark seat as booked
    seat.isBooked = true;
    await schedule.save();

    // Create booking record
    const booking = new Booking({
      userId,
      scheduleId,
      seatNumber,
      status: "booked"
    });

    await booking.save();

    return booking;
  }
}

export default new BookingService();
