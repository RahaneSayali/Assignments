import { Request, Response } from "express";
import { regUser } from "../service/userService";
import { loginUser } from "../service/userService";
import { regAdmin, loginAdmin } from "../service/adminService";

export const userReg = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const result = await regUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const adminReg = async (req: Request, res: Response) => {
  const { name, email, password,role } = req.body;

  try {
    const result = await regAdmin(name, email, password,role);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginAdmin(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
