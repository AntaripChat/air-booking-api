import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  scheduleId: string;
  seatNumber: number;
  status: string;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    seatNumber: { type: Number, required: true },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
