import mongoose, { Schema, Document, Model } from "mongoose";

interface ISeat {
  seatNumber: number;
  isBooked: boolean;
}

export interface ISchedule extends Document {
  aircraftId: string;
  date: string;
  time: string;
  seats: ISeat[];
}

const seatSchema = new Schema<ISeat>({
  seatNumber: { type: Number, required: true },
  isBooked: { type: Boolean, default: false }
});

const scheduleSchema = new Schema<ISchedule>(
  {
    aircraftId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seats: [seatSchema]
  },
  { timestamps: true }
);

export const Schedule: Model<ISchedule> =
  mongoose.models.Schedule || mongoose.model<ISchedule>("Schedule", scheduleSchema);
