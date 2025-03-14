import { Request, Response, NextFunction } from "express";
import {
  UserError,
  NotFoundError,
  AuthError,
  FunctionError,
  MovieError,
  ReservationError,
  SeatError,
  TheaterError,
} from "../utils/errorFactory";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // puse los errores asi por si se ofrece usarlos de otra forma, pero estan listos para manipular
  if (
    err instanceof UserError ||
    err instanceof AuthError ||
    err instanceof FunctionError ||
    err instanceof MovieError ||
    err instanceof ReservationError ||
    err instanceof SeatError ||
    err instanceof TheaterError 
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
