import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

interface AuthRequest extends Request {
  user?: { id: string; role: "admin" | "user" };
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as {
      id: string;
      role: "admin" | "user";
    };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: " Invalid Token" });
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if ((req as any).user?.role !== "admin") {
    res.status(403).json({ error: "access denied admins only" });
  }
  next();
};

export const authorizeUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "user") {
    res.status(403).json({
      error: "Access denied Users only",
    });
    return;
  }
  next();
};
