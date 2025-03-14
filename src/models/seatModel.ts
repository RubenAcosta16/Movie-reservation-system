import mongoose, { Schema } from "mongoose";
import { ISeat } from "../types";

const seatSchema = new Schema<ISeat>(
  {
    numberName: { type: Number, required: true },
    theaterId: { type: String, required: true },
  },
  { timestamps: true }
);

export const SeatModel = mongoose.model<ISeat>("Seat", seatSchema);
