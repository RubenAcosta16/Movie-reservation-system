import { Request, Response, NextFunction } from "express";
import { ReservationType } from "../types";
import reservationService from "../services/reservationService";
import { ReservationError } from "../utils/errorFactory";

const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservation: Omit<ReservationType, "_id"> = req.body;
  try {
    const newReservation = await reservationService.create(reservation);

    res.status(200).json({
      message: "Reservation created successfully",
      data: newReservation,
    });
  } catch (error) {
    next(error);
  }
};

const getReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await reservationService.getAll();
    res.status(200).json({
      message: "Get reservations successfully",
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
};

const getOneReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const reservation = await reservationService.getOne({ reservationId: id });
    res.status(200).json({
      message: "Get reservation successfully",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

const getMyReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) throw new ReservationError("No token provided");

    const myReservations = await reservationService.getMyReservations({
      userId,
    });

    res.status(200).json({
      message: "Get reservations successfully",
      data: myReservations,
    });
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updates: ReservationType = req.body;

  try {
    const updatedReservation = await reservationService.updateOne({
      reservationId: id,
      updates,
    });
    res.status(200).json({
      message: "Reservation updated successfully",
      data: updatedReservation,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await reservationService.deleteOne({ reservationId: id });
    res.status(200).json({
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const reservationController = {
  createReservation,
  getReservations,
  getOneReservation,
  updateReservation,
  deleteReservation,
  getMyReservations,
};
export default reservationController;
