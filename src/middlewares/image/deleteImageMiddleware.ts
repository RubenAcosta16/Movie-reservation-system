import { Request, Response, NextFunction } from "express";
import { deleteImage } from "../../utils/image";
import { MovieType } from "../../types";
import { ImageModel } from "../../models/imageModel";
import { MovieError } from "../../utils/errorFactory";

const deleteImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updates: MovieType = req.body;

  if (!updates.imgUrl) return next(); // Si no hay url, continua con lo demas

  try {
    const image = await ImageModel.findOne({ imgUrl: updates.imgUrl });
    if (!image) throw new MovieError("Image not found");

    await deleteImage(image.publicId);

    await ImageModel.deleteOne({ imgUrl: updates.imgUrl });

    next();
  } catch (error) {
    next(error);
  }
};

export default deleteImageMiddleware;
