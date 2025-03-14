import { SeatModel } from "../models/seatModel";
import { ISeat, SeatType } from "../types";
import { SeatError } from "../utils/errorFactory";

import Validations from "../validations/seatValidations";

type Tcreate = Omit<SeatType, "_id">;
const create = async (seat: Tcreate): Promise<ISeat> => {
  Validations.numberName(seat.numberName);

  const newSeat = new SeatModel(seat);
  await newSeat.save();
  return newSeat;
};

const getAll = async (): Promise<ISeat[]> => {
  return SeatModel.find();
};

type TGetOne = {
  numberName: string;
};
const getOne = async ({ numberName }: TGetOne): Promise<ISeat> => {
  if (!numberName) throw new SeatError("numberName is required");

  Validations.numberName(Number(numberName));

  const seat = await SeatModel.findOne({ numberName });
  if (!seat) throw new SeatError(`Seat with ID ${numberName} not found`);
  return seat;
};

type Tupdate = {
  numberName: string;
  updates: SeatType;
};
const updateOne = async ({ numberName, updates }: Tupdate): Promise<ISeat> => {
  if (!numberName) throw new SeatError("numberName is required");
  Validations.numberName(updates.numberName);

  const seatFound = await SeatModel.findOne({ numberName });
  if (!seatFound) {
    throw new SeatError(`Seat with ID ${numberName} not found`);
  }

  Object.assign(seatFound, updates);
  await seatFound.save();

  return seatFound;
};

type Tdelete = {
  numberName: string;
};
const deleteOne = async ({ numberName }: Tdelete) => {
  if (!numberName) throw new SeatError("numberName is required");
  const seatFound = await SeatModel.deleteOne({ numberName });
  if (seatFound.deletedCount === 0) {
    throw new SeatError(`Seat with ID ${numberName} not found`);
  }
};

const seatService = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
export default seatService;
