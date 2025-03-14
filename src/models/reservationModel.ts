import mongoose, { Schema } from "mongoose";
import { IReservation } from "../types";

const reservationSchema = new Schema<IReservation>(
  {
    userId: { type: "string", required: true },
    functionId: { type: "string", required: true },
    seatNumberName: { type: "number", required: true },
  },
  { timestamps: true }
);

export const ReservationModel = mongoose.model<IReservation>(
  "Reservation",
  reservationSchema
);
