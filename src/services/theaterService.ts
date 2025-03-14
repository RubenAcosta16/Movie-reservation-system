import { TheaterModel } from "../models/theaterModel";
import { ITheater, TheaterType } from "../types";
import { TheaterError } from "../utils/errorFactory";

import Validations from "../validations/theaterValidations";

type Tcreate = Omit<TheaterType, "_id">;
const create = async (theater: Tcreate): Promise<ITheater> => {
  Validations.numberName(theater.numberName);
  Validations.capacity(theater.capacity);

  const theaterFound = await TheaterModel.findOne({
    numberName: theater.numberName,
  });
  if (theaterFound) throw new TheaterError("Theater already exists");

  const newTheater = new TheaterModel(theater);
  await newTheater.save();
  return newTheater;
};

const getAll = async (): Promise<ITheater[]> => {
  return TheaterModel.find();
};

const getOne = async ({
  theaterId,
}: {
  theaterId: string;
}): Promise<ITheater> => {
  if (!theaterId) throw new TheaterError("TheaterId is required");

  const theater = await TheaterModel.findOne({ _id: theaterId });
  if (!theater)
    throw new TheaterError(`Theater with ID ${theaterId} not found`);
  return theater;
};

type Tupdate = {
  theaterId: string;
  updates: TheaterType;
};
const updateOne = async ({
  theaterId,
  updates,
}: Tupdate): Promise<ITheater> => {
  if (!theaterId) throw new TheaterError("TheaterId is required");
  Validations.numberName(updates.numberName);
  Validations.capacity(updates.capacity);

  const theaterFoundCapacity = await TheaterModel.findOne({
    numberName: updates.numberName,
  });
  if (theaterFoundCapacity) throw new TheaterError("Theater already exists");

  const theaterFound = await TheaterModel.findById(theaterId);
  if (!theaterFound) {
    throw new TheaterError(`Theater with ID ${theaterId} not found`);
  }

  Object.assign(theaterFound, updates);
  await theaterFound.save();

  return theaterFound;
};

type Tdelete = {
  theaterId: string;
};
const deleteOne = async ({ theaterId }: Tdelete) => {
  if (!theaterId) throw new TheaterError("TheaterId is required");
  const theaterFound = await TheaterModel.deleteOne({ _id: theaterId });
  if (theaterFound.deletedCount == 0) {
    throw new TheaterError(`Theater with ID ${theaterId} not found`);
  }
};

const theaterService = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
export default theaterService;
