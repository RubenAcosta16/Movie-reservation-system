import { MovieError } from "../utils/errorFactory";

class Validation {
  static nameMovie(name: string): void {
    if (!name) throw new MovieError("Name is required");
    if (typeof name !== "string") throw new MovieError("Name must be a string");
  }

  static description(description: string): void {
    if (!description) throw new MovieError("Description is required");
    if (typeof description !== "string")
      throw new MovieError("Description must be a string");
  }
  static year(year: number): void {
    if (!year) throw new MovieError("Year is required");
    if (typeof year !== "number") throw new MovieError("Year must be a number");
    if (year <= 0) throw new MovieError("Year must be greater than 0");
  }

  static genre(genre: string): void {
    if (!genre) throw new MovieError("Genre is required");
    if (typeof genre !== "string")
      throw new MovieError("Genre must be a string");
  }

  static duration(duration: number): void {
    if (!duration) throw new MovieError("Duration is required");
    if (typeof duration !== "number")
      throw new MovieError("Duration must be a number");
    if (duration <= 0) throw new MovieError("Duration must be greater than 0");
  }
}

export default Validation;
