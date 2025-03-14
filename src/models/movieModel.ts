import mongoose, { Schema } from "mongoose";
import { IMovie } from "../types";

const movieSchema = new Schema<IMovie>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    imgUrl: { type: String },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

export const MovieModel = mongoose.model<IMovie>("Movie", movieSchema);
