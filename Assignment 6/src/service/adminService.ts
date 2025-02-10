import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel";
import { config } from "dotenv";

config();

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export const regAdmin = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    const existingAdmin = await Admin.findOne({
      where: { email, role: "admin" },
    });

    if (existingAdmin) {
      return {
        error: "User with this email already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      {
        userId: newAdmin.id,
        email: newAdmin.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      message: "Admin created successfully",
      adminId: newAdmin.id,
      token,
    };
  } catch (error) {
    throw new Error("Admin registration failed: " + error);
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: admin.id, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { message: "Admin login successful", token };
  } catch (error) {
    throw new Error("Admin login failed: " + error);
  }
};
