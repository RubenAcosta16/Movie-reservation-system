import mongoose, { Schema } from "mongoose";
import { ITheater } from "../types";

const theaterSchema = new Schema<ITheater>(
  {
    numberName: { type: Number, required: true },
    capacity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const TheaterModel = mongoose.model<ITheater>("Theater", theaterSchema);
