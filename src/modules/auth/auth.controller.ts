import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthServices.loginWithEmailAndPassword(
      email,
      password
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(201).json(error);
  }
};

const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.authWithGoogle(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(201).json(error);
  }
};
export const AuthController = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
