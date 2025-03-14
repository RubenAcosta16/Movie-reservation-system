import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel";
import { IUser, UserRole, UserType } from "../types";
import { SALTROUNDS, SECRET_JWT_KEY } from "../config";

import { UserError } from "../utils/errorFactory";
// import { NewUserType } from "../types";
import Validations from "../validations/userValidations";
import jwt, { JwtPayload } from "jsonwebtoken";

type IUserWithoutPassword = Omit<UserType, "password">;
type NewUserType = Omit<UserType, "_id" | "imgUrl" | "role">;

const register = async ({
  username,
  password,
  email,
}: NewUserType): Promise<IUserWithoutPassword> => {
  Validations.username(username);
  Validations.password(password);
  Validations.email(email);

  const existingEmail = await UserModel.findOne({ email });

  if (existingEmail) throw new UserError("Email already in use");

  const hashedPassword = await bcrypt.hash(password, Number(SALTROUNDS));

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    role: "user",
  });

  await newUser.save();

  const userWithoutPassword: IUserWithoutPassword = {
    _id: (newUser._id as unknown as string).toString(),
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
  };

  return userWithoutPassword;
};

const login = async ({
  email,
  password,
}: Omit<NewUserType, "username" | "">): Promise<IUserWithoutPassword> => {
  Validations.email(email);
  Validations.password(password);

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UserError("Email no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UserError("Contraseña incorrecta");
  }

  const userWithoutPassword: IUserWithoutPassword = {
    _id: (user._id as unknown as string).toString(),
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return userWithoutPassword;
};

const protectedRoute = (token: string): JwtPayload => {
  try {
    if (!SECRET_JWT_KEY) {
      throw new UserError("Secret JWT key is not defined");
    }
    return jwt.verify(token, SECRET_JWT_KEY) as JwtPayload;
  } catch {
    throw new UserError("Invalid token");
  }
};

type Trole = {
  userId: string;
  role: UserRole;
};
const changeRole = async ({ userId, role }: Trole): Promise<IUser> => {
  if (!role || !userId) throw new UserError("All props must be required");

  const user = await UserModel.findById(userId);
  if (!user) throw new UserError("User not found");

  user.role = role;
  await user.save();

  return user;
};

const userService = {
  register,
  login,
  protectedRoute,
  changeRole,
};
export default userService;
