import { FunctionModel } from "../models/functionModel";
import { ReservationModel } from "../models/reservationModel";
import { SeatModel } from "../models/seatModel";
import { UserModel } from "../models/userModel";
import { IReservation, ReservationType } from "../types";
import { ReservationError } from "../utils/errorFactory";

import Validations from "../validations/reservationValidations";
import SeatValidations from "../validations/seatValidations";

type Tcreate = Omit<ReservationType, "_id">;
const create = async (reservation: Tcreate): Promise<IReservation> => {
  Validations.idFunction(reservation.functionId);
  Validations.idUser(reservation.userId);

  const functionFound = await FunctionModel.findById(reservation.functionId);
  if (!functionFound) throw new ReservationError("Function not found");

  const userFound = await UserModel.findById(reservation.userId);
  if (!userFound) throw new ReservationError("User not found");

  SeatValidations.numberName(reservation.seatNumberName);

  const seatFound = await SeatModel.findOne({
    numberName: reservation.seatNumberName,
  });
  if (!seatFound) throw new ReservationError("Seat not found");

  const reservationFound = await ReservationModel.findOne({
    functionId: reservation.functionId,
    seatNumberName: reservation.seatNumberName,
    userId: reservation.userId,
  });
  if (reservationFound)
    throw new ReservationError("Reservation already exists");

  const newReservation = new ReservationModel(reservation);
  await newReservation.save();
  return newReservation;
};

const getAll = async (): Promise<IReservation[]> => {
  return ReservationModel.find();
};

type TGetOne = {
  reservationId: string;
};
const getOne = async ({ reservationId }: TGetOne): Promise<IReservation> => {
  if (!reservationId) throw new ReservationError("reservationId is required");

  const reservation = await ReservationModel.findById(reservationId);
  if (!reservation)
    throw new ReservationError(
      `Reservation with ID ${reservationId} not found`
    );
  return reservation;
};

type TGetMy = {
  userId: string;
};
const getMyReservations = async ({
  userId,
}: TGetMy): Promise<IReservation[]> => {
  if (!userId) throw new ReservationError("userId is required");

  const myReservations = await ReservationModel.find({ userId });
  // if (myReservations.length > 0) {
  //   throw new ReservationError(`Reservations not found`);
  // }

  return myReservations;
};

type Tupdate = {
  reservationId: string;
  updates: ReservationType;
};
const updateOne = async ({
  reservationId,
  updates,
}: Tupdate): Promise<IReservation> => {
  if (!reservationId) throw new ReservationError("reservationId is required");

  Validations.idFunction(updates.functionId);
  Validations.idUser(updates.userId);

  const functionFound = await FunctionModel.findById(updates.functionId);
  if (!functionFound) throw new ReservationError("Function not found");

  const userFound = await UserModel.findById(updates.userId);
  if (!userFound) throw new ReservationError("User not found");

  SeatValidations.numberName(updates.seatNumberName);

  const seatFound = await SeatModel.findOne({
    numberName: updates.seatNumberName,
  });
  if (!seatFound) throw new ReservationError("Seat not found");

  const reservationValidate = await ReservationModel.findOne({
    functionId: updates.functionId,
    seatNumberName: updates.seatNumberName,
    userId: updates.userId,
  });
  if (reservationValidate)
    throw new ReservationError("Reservation already exists");

  const reservationFound = await ReservationModel.findById(reservationId);
  if (!reservationFound) {
    throw new ReservationError(
      `Reservation with ID ${reservationId} not found`
    );
  }

  Object.assign(reservationFound, updates);
  await reservationFound.save();

  return reservationFound;
};

type Tdelete = {
  reservationId: string;
};
const deleteOne = async ({ reservationId }: Tdelete) => {
  if (!reservationId) throw new ReservationError("reservationId is required");
  const reservationFound = await ReservationModel.deleteOne({
    _id: reservationId,
  });
  if (reservationFound.deletedCount === 0) {
    throw new ReservationError(
      `Reservation with ID ${reservationId} not found`
    );
  }
};

const reservationService = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  getMyReservations,
};
export default reservationService;
