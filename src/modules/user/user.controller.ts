import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
const getAllFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserServices.getAllFromDb();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await UserServices.getUserById(id);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await UserServices.deleteUserById(id);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const UserController = {
  createUser,
  getAllFromDb,
  getUserById,
  deleteUserById,
};
