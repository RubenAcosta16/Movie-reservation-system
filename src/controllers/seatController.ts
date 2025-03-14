import { Request, Response, NextFunction } from "express";
import { SeatType } from "../types";
import seatService from "../services/seatService";

const createSeat = async (req: Request, res: Response, next: NextFunction) => {
  const seat: Omit<SeatType, "_id"> = req.body;
  try {
    const newSeat = await seatService.create(seat);

    res.status(200).json({
      message: "Seat created successfully",
      data: newSeat,
    });
  } catch (error) {
    next(error);
  }
};

const getSeats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seats = await seatService.getAll();
    res.status(200).json({
      message: "Get seats successfully",
      data: seats,
    });
  } catch (error) {
    next(error);
  }
};

const getOneSeat = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const seat = await seatService.getOne({ numberName: id });
    res.status(200).json({
      message: "Get seat successfully",
      data: seat,
    });
  } catch (error) {
    next(error);
  }
};

const updateSeat = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updates: SeatType = req.body;

  try {
    const updatedSeat = await seatService.updateOne({
      numberName: id,
      updates,
    });
    res.status(200).json({
      message: "Seat updated successfully",
      data: updatedSeat,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSeat = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await seatService.deleteOne({ numberName: id });
    res.status(200).json({
      message: "Seat deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const seatController = {
  createSeat,
  getSeats,
  getOneSeat,
  updateSeat,
  deleteSeat,
};
export default seatController;
