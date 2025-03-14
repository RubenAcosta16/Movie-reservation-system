const createErrorFactory = (name: string) => {
  return class BusinessError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
};

export const NotFoundError = createErrorFactory("NotFoundError");
export const AuthError = createErrorFactory("AuthError");

export const UserError = createErrorFactory("UserError");
export const TheaterError = createErrorFactory("TheaterError");
export const MovieError = createErrorFactory("MovieError");
export const SeatError = createErrorFactory("SeatError");
export const FunctionError = createErrorFactory("FunctionError");
export const ReservationError = createErrorFactory("ReservationError");

