import { MovieModel } from "../models/movieModel";
import { IMovie, MovieFilter, MovieType } from "../types";
import { MovieError } from "../utils/errorFactory";

import Validations from "../validations/movieValidations";

type Tcreate = Omit<MovieType, "_id">;
const create = async (movie: Tcreate): Promise<IMovie> => {
  Validations.nameMovie(movie.name);
  Validations.description(movie.description);
  Validations.year(movie.year);
  Validations.genre(movie.genre);
  Validations.duration(movie.duration);

  const movieFound = await MovieModel.findOne({
    name: movie.name,
    year: movie.year,
  });

  if (movieFound)
    throw new MovieError(
      `Movie with name ${movie.name} and year ${movie.year} already exists`
    );

  const newMovie = new MovieModel(movie);
  await newMovie.save();
  return newMovie;
};

const getAll = async ({
  limit,
  maxPrice,
  minPrice,
  page,
  search,
  genre,
}: MovieFilter): Promise<IMovie[]> => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (pageNumber < 1 || limitNumber < 1) {
    throw new MovieError("Invalid pagination parameters");
  }

  if ((pageNumber && !limitNumber) || (!pageNumber && limitNumber))
    throw new MovieError("Invalid pagination parameters");

  const queryFilter: any = {};

  if (search) {
    queryFilter.name = { $regex: search, $options: "i" };
  }

  if (genre) {
    queryFilter.category = genre;
  }

  if (minPrice !== undefined) {
    queryFilter.price = { ...queryFilter.price, $gte: minPrice };
  }

  if (maxPrice !== undefined) {
    queryFilter.price = { ...queryFilter.price, $lte: maxPrice };
  }

  const movies = await MovieModel.find(queryFilter)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber);

  return movies;
};

type TGetOne = {
  movieId: string;
};
const getOne = async ({ movieId }: TGetOne): Promise<IMovie> => {
  if (!movieId) throw new MovieError("movieId is required");

  const movie = await MovieModel.findById(movieId);
  if (!movie) throw new MovieError(`Movie with ID ${movieId} not found`);
  return movie;
};

type Tupdate = {
  movieId: string;
  updates: MovieType;
};
const updateOne = async ({ movieId, updates }: Tupdate): Promise<IMovie> => {
  if (!movieId) throw new MovieError("movieId is required");

  if (updates.name) Validations.nameMovie(updates.name);
  if (updates.year) Validations.year(updates.year);
  if (updates.description) Validations.description(updates.description);
  if (updates.genre) Validations.genre(updates.genre);
  if (updates.duration) Validations.duration(updates.duration);

  if (updates.year && updates.name) {
    const movieFoundName = await MovieModel.findOne({
      name: updates.name,
      year: updates.year,
    });

    if (movieFoundName)
      throw new MovieError(
        `Movie with name ${updates.name} and year ${updates.year} already exists`
      );
  }

  const movieFound = await MovieModel.findById(movieId);
  if (!movieFound) {
    throw new MovieError(`Movie with ID ${movieId} not found`);
  }

  Object.assign(movieFound, updates);
  await movieFound.save();

  return movieFound;
};

type Tdelete = {
  movieId: string;
};
const deleteOne = async ({ movieId }: Tdelete) => {
  if (!movieId) throw new MovieError("movieId is required");

  const movieFound = await MovieModel.deleteOne({ _id: movieId });

  if (movieFound.deletedCount === 0) {
    throw new MovieError(`Movie with ID ${movieId} not found`);
  }
};

const movieService = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
export default movieService;
