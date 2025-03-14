import { Document } from "mongoose";

export type SessionType = { user: null | { id: string; username: string } };

// User --------------------------------------------------------------------------------------------

export type UserRole = "admin" | "user";

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  imgUrl?: string;
}

export interface IUser extends Document, Omit<UserType, "_id"> {}

// Theater --------------------------------------------------------------------------------------------
export interface TheaterType {
  _id: string;
  numberName: number;
  capacity: number; 
}

export interface ITheater extends Document, Omit<TheaterType, "_id"> {}

// Movie --------------------------------------------------------------------------------------------
export interface MovieType {
  _id: string;
  name: string; 
  description: string;
  year: number;
  genre: string;
  imgUrl?: string;
  duration: number;
  // imgUrl: [{ imgUrl: string }];
}

export interface IMovie extends Document, Omit<MovieType, "_id"> {}

export interface MovieFilter {
  search?: string;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}


// Seat --------------------------------------------------------------------------------------------
export interface SeatType {
  _id: string;
  numberName: number;
  theaterId: string; // Referencia a la sala
}

export interface ISeat extends Document, Omit<SeatType, "_id"> {}

// Function --------------------------------------------------------------------------------------------
export interface FunctionType {
  _id: string; 
  idTheater: string; // Referencia a la sala
  idMovie: string; // Referencia a la película
  price: number;
  dateTime: Date;
}

export interface IFunction extends Document, Omit<FunctionType, "_id"> {}

// Reservation --------------------------------------------------------------------------------------------
export interface ReservationType {
  _id: string;
  userId: string; // Referencia al usuario
  functionId: string; // Referencia a la función
  seatNumberName: number; // Referencia al asiento
}

export interface IReservation extends Document, Omit<ReservationType, "_id"> {}

// image ----------------------------------------------------------------------------------------------------

export interface ImageType {
  publicId: string;
  imgUrl: string;
}

export interface IImage extends Document, ImageType {}
