import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAircraft extends Document {
  name: string;
  code: string;      // unique aircraft code (G650, F900…)
  seats: number;
  price: number;     // base booking price
  createdAt: Date;
  updatedAt: Date;
}

const aircraftSchema = new Schema<IAircraft>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Aircraft: Model<IAircraft> =
  mongoose.models.Aircraft || mongoose.model<IAircraft>("Aircraft", aircraftSchema);
