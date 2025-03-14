import { Request, Response, NextFunction } from "express";
import { FunctionType } from "../types";
import functionService from "../services/functionService";

const createFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const func: Omit<FunctionType, "_id"> = req.body;
  try {
    const newFunction = await functionService.create(func);

    res.status(200).json({
      message: "Function created successfully",
      data: newFunction,
    });
  } catch (error) {
    next(error);
  }
};

const getFunctions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const functions = await functionService.getAll();
    res.status(200).json({
      message: "Get functions successfully",
      data: functions,
    });
  } catch (error) {
    next(error);
  }
};

const getOneFunction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const func = await functionService.getOne({ functionId: id });
    res.status(200).json({
      message: "Get function successfully",
      data: func,
    });
  } catch (error) {
    next(error);
  }
};

const updateFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updates: FunctionType = req.body;

  try {
    const updatedFunction = await functionService.updateOne({
      functionId: id,
      updates,
    });
    res.status(200).json({
      message: "Function updated successfully",
      data: updatedFunction,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await functionService.deleteOne({ functionId: id });
    res.status(200).json({
      message: "Function deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const functionController = {
  createFunction,
  getFunctions,
  getOneFunction,
  updateFunction,
  deleteFunction,
};
export default functionController;
