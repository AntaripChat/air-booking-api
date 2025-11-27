import { Schedule } from "../model/schedule.model";
import { Aircraft } from "../model/aircraft.model";

class ScheduleService {
  async createSchedule(aircraftId: string, date: string, time: string) {
    const aircraft = await Aircraft.findById(aircraftId);
    if (!aircraft) throw new Error("Aircraft not found");

    // Generate seats based on aircraft seat count
    const seats = [];
    for (let i = 1; i <= aircraft.seats; i++) {
      seats.push({ seatNumber: i, isBooked: false });
    }

    const schedule = new Schedule({
      aircraftId,
      date,
      time,
      seats
    });

    return await schedule.save();
  }

  async getSchedules() {
    return await Schedule.find().populate("aircraftId");
  }
}

export default new ScheduleService();
