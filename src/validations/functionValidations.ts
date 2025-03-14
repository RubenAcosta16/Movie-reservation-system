import { FunctionError } from "../utils/errorFactory";

class Validation {
  static idTheater(idTheater: string): void {
    if (!idTheater) throw new FunctionError("IdTheater is required");
    if (typeof idTheater !== "string")
      throw new FunctionError("IdTheater must be a string");
  }

  static idMovie(idTheater: string): void {
    if (!idTheater) throw new FunctionError("IdMovie is required");
    if (typeof idTheater !== "string")
      throw new FunctionError("IdMovie must be a string");
  }

  static price(price: number): void {
    if (!price) throw new FunctionError("Price is required");
    if (typeof price !== "number")
      throw new FunctionError("Price must be a number");
    if (price <= 0) throw new FunctionError("Price must be greater than 0");
  }

  static dateTime(dateTime: Date): void {
    if (!dateTime) throw new FunctionError("DateTime is required");
    if (!(dateTime instanceof Date))
      throw new FunctionError("DateTime must be a Date");
  }
}

export default Validation;
