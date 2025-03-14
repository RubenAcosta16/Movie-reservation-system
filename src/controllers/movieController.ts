import { Request, Response, NextFunction } from "express";
import { MovieFilter, MovieType } from "../types";
import movieService from "../services/movieService";

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  const movie: Omit<MovieType, "_id"> = req.body;

  movie.imgUrl = req.imageUrl || movie.imgUrl;

  try {
    const newMovie = await movieService.create(movie);

    res.status(200).json({
      message: "Movie created successfully",
      data: newMovie,
    });
  } catch (error) {
    next(error);
  }
};

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  const filter: MovieFilter = req.body;

  try {
    const movies = await movieService.getAll(filter);
    res.status(200).json({
      message: "Get movies successfully",
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

const getOneMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getOne({ movieId: id });
    res.status(200).json({
      message: "Get movie successfully",
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updates: MovieType = req.body;

  updates.imgUrl = req.imageUrl || updates.imgUrl;

  try {
    const updatedMovie = await movieService.updateOne({ movieId: id, updates });
    res.status(200).json({
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await movieService.deleteOne({ movieId: id });
    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const movieController = {
  createMovie,
  getMovies,
  getOneMovie,
  updateMovie,
  deleteMovie,
};
export default movieController;
