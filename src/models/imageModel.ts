import mongoose, { Schema } from "mongoose";
import { IImage } from "../types";

const imageSchema = new Schema<IImage>(
  {
    imgUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

export const ImageModel = mongoose.model<IImage>("Function", imageSchema);
