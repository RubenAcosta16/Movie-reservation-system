import { FunctionModel } from "../models/functionModel";
import { MovieModel } from "../models/movieModel";
import { TheaterModel } from "../models/theaterModel";
import { IFunction, FunctionType } from "../types";
import { FunctionError } from "../utils/errorFactory";

import Validations from "../validations/functionValidations";

type Tcreate = Omit<FunctionType, "_id">;
const create = async (functionMovie: Tcreate): Promise<IFunction> => {
  Validations.idMovie(functionMovie.idMovie);
  Validations.idTheater(functionMovie.idTheater);
  Validations.price(functionMovie.price);
  Validations.dateTime(functionMovie.dateTime);

  const theater = await TheaterModel.findById(functionMovie.idTheater);
  if (!theater) throw new FunctionError("Theater not found");

  const movie = await MovieModel.findById(functionMovie.idMovie);
  if (!movie) throw new FunctionError("Movie not found");

  const functionFound = await FunctionModel.findOne({
    idMovie: functionMovie.idMovie,
    idTheater: functionMovie.idTheater,
    dateTime: functionMovie.dateTime,
  });
  if (functionFound) throw new FunctionError("Function already exists");

  const newFunction = new FunctionModel(functionMovie);
  await newFunction.save();
  return newFunction;
};

const getAll = async (): Promise<IFunction[]> => {
  return FunctionModel.find();
};

type TGetOne = {
  functionId: string;
};
const getOne = async ({ functionId }: TGetOne): Promise<IFunction> => {
  if (!functionId) throw new FunctionError("functionId is required");

  const functionMovie = await FunctionModel.findById(functionId);
  if (!functionMovie)
    throw new FunctionError(`Function with ID ${functionId} not found`);
  return functionMovie;
};

type Tupdate = {
  functionId: string;
  updates: FunctionType;
};
const updateOne = async ({
  functionId,
  updates,
}: Tupdate): Promise<IFunction> => {
  if (!functionId) throw new FunctionError("functionId is required");
  Validations.idMovie(updates.idMovie);
  Validations.idTheater(updates.idTheater);
  Validations.price(updates.price);
  Validations.dateTime(updates.dateTime);

  const theater = await TheaterModel.findById(updates.idTheater);
  if (!theater) throw new FunctionError("Theater not found");

  const movie = await MovieModel.findById(updates.idMovie);
  if (!movie) throw new FunctionError("Movie not found");

  const functionValidate = await FunctionModel.findOne({
    idMovie: updates.idMovie,
    idTheater: updates.idTheater,
    dateTime: updates.dateTime,
  });
  if (functionValidate) throw new FunctionError("Function already exists");

  const functionFound = await FunctionModel.findById(functionId);
  if (!functionFound) {
    throw new FunctionError(`Function with ID ${functionId} not found`);
  }

  Object.assign(functionFound, updates);
  await functionFound.save();

  return functionFound;
};

type Tdelete = {
  functionId: string;
};
const deleteOne = async ({ functionId }: Tdelete) => {
  if (!functionId) throw new FunctionError("functionId is required");
  const functionFound = await FunctionModel.deleteOne({ _id: functionId });
  if (functionFound.deletedCount === 0) {
    throw new FunctionError(`Function with ID ${functionId} not found`);
  }
};

const functionService = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
export default functionService;