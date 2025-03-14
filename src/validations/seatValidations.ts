import { SeatError } from "../utils/errorFactory";
import { maxCapacity } from "../config/const";

class Validation {
  static numberName(numberName: number): void {
    if (!numberName) throw new SeatError("NumberName is required");
    if (typeof numberName !== "number")
      throw new SeatError("NumberName must be a number");
    if (numberName > maxCapacity)
      throw new SeatError("NumberName must be less than " + maxCapacity);
  }
}

export default Validation;
