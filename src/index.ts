import express, { Request, Response, NextFunction } from "express";
import connectDB from "./database/database";
import cookieParser from "cookie-parser";

import { PORT } from "./config";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";

import v1UserRoutes from "./v1/routes/userRoutes";
import v1FunctionRoutes from "./v1/routes/functionRoutes";
import v1MovieRoutes from "./v1/routes/movieRoutes";
import v1ReservationRoutes from "./v1/routes/reservationRoutes";
import v1SeatRoutes from "./v1/routes/seatRoutes";
import v1TheaterRoutes from "./v1/routes/theaterRoutes";

import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

declare module "express" {
  interface Request {
    session?: { user: null | { id: string; username: string } };
  }
}

app.use(sessionMiddleware);
app.use("/api/v1/user", v1UserRoutes);
app.use("/api/v1/function", v1FunctionRoutes);
app.use("/api/v1/movie", v1MovieRoutes);
app.use("/api/v1/reservation", v1ReservationRoutes);
app.use("/api/v1/seat", v1SeatRoutes);
app.use("/api/v1/theater", v1TheaterRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
