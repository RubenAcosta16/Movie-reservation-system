import { Request, Response, NextFunction } from "express";
import { imageUpload } from "../../utils/image";
import { ImageModel } from "../../models/imageModel";

declare module "express" {
  interface Request {
    imageUrl?: string;
  }
}

const uploadImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next(); // Si no hay archivo, continúa con el siguiente middleware

  try {
    const { url, publicId } = await imageUpload(req.file);

    const newImage = new ImageModel({ url, publicId });
    await newImage.save();

    req.imageUrl = url;
    next();
  } catch (error) {
    next(error);
  }
};

export default uploadImageMiddleware;
