import { Request, Response, NextFunction } from "express";
import { TheaterType } from "../types";
import theaterService from "../services/theaterService";

const createTheater = async (req: Request, res: Response, next: NextFunction) => {
  const theater: Omit<TheaterType, "_id"> = req.body;
  try {
    const newTheater = await theaterService.create(theater);

    res.status(200).json({
      message: "Theater created successfully",
      data: newTheater,
    });
  } catch (error) {
    next(error);
  }
};

const getTheaters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const theaters = await theaterService.getAll();
    res.status(200).json({
      message: "Get theaters successfully",
      data: theaters,
    });
  } catch (error) {
    next(error);
  }
};

const getOneTheater = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const theater = await theaterService.getOne({ theaterId: id });
    res.status(200).json({
      message: "Get theater successfully",
      data: theater,
    });
  } catch (error) {
    next(error);
  }
};

const updateTheater = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updates: TheaterType = req.body;

  try {
    const updatedTheater = await theaterService.updateOne({
      theaterId: id,
      updates,
    });
    res.status(200).json({
      message: "Theater updated successfully",
      data: updatedTheater,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTheater = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await theaterService.deleteOne({ theaterId: id });
    res.status(200).json({
      message: "Theater deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const theaterController = {
  createTheater,
  getTheaters,
  getOneTheater,
  updateTheater,
  deleteTheater,
};
export default theaterController;