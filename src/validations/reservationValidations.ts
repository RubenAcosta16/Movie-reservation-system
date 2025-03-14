import { ReservationError } from "../utils/errorFactory";

class Validation {
  static idUser(idTheater: string): void {
    if (!idTheater) throw new ReservationError("idUser is required");
    if (typeof idTheater !== "string")
      throw new ReservationError("idUser must be a string");
  }

  static idSeat(idTheater: string): void {
    if (!idTheater) throw new ReservationError("idSeat is required");
    if (typeof idTheater !== "string")
      throw new ReservationError("idSeat must be a string");
  }

  static idFunction(idTheater: string): void {
    if (!idTheater) throw new ReservationError("idFunction is required");
    if (typeof idTheater !== "string")
      throw new ReservationError("idFunction must be a string");
  }
}

export default Validation;
