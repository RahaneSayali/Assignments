import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Define a custom interface to extend Request
interface AuthRequest extends Request {
  employee?: any; // You can replace `any` with a proper Employee type
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ error: "Unauthorized" });
     return
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; role: string }; // Ensure correct typing
    req.employee = decoded; 
    next(); // Pass control to the next middleware
  } catch (error) {
     res.status(401).json({ error: "Invalid token" });

  }
};
