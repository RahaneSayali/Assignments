import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Employee from "../models/EmpModel";

config();

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Define a custom interface to extend Request
// interface Employe {
//   id: string;
//   role: string;
// }

// export interface AuthRequest extends Request {
//   employee?: Employe;
// }

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: string;
      role: string;
    };
    (req as any).employee = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
