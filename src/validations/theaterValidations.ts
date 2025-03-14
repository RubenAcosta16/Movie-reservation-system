import { TheaterError } from "../utils/errorFactory";
import { maxCapacity } from "../config/const";

class Validation {
  static numberName(numberName: number): void {
    if (!numberName) throw new TheaterError("NumberName is required");
    if (typeof numberName !== "number")
      throw new TheaterError("NumberName must be a number");
  }

  static capacity(capacity: number): void {
    if (!capacity) throw new TheaterError("Capacity is required");
    if (typeof capacity !== "number")
      throw new TheaterError("Capacity must be a number");
    if (capacity <= 0)
      throw new TheaterError("Capacity must be greater than 0");
    if (capacity > maxCapacity)
      throw new TheaterError("NumberName must be less than " + maxCapacity);
  }
}

export default Validation;
