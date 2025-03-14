import mongoose, { Schema } from "mongoose";
import { IFunction } from "../types";

const functionSchema = new Schema<IFunction>(
  {
    idTheater: { type: String, required: true },
    idMovie: { type: String, required: true },
    dateTime: { type: Date, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const FunctionModel = mongoose.model<IFunction>("FunctionModel", functionSchema);
