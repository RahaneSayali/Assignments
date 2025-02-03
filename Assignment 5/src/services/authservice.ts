import Employee from "../models/EmpModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
config();

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key";

export const registerEmployee = async (
  name: string,
  email: string,
  password: string,
  assignedShiftHours: number,
  role: string
) => {
  const existingEmployee = await Employee.findOne({ where: { email } });
  if (existingEmployee) throw new Error("Employee already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const employee = await Employee.create({
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    assignedShiftHours,
    role,
  });

  return employee;
};

export const loginEmployee = async (email: string, password: string) => {
  const employee = await Employee.findOne({ where: { email } });
  if (!employee) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: employee.id, role: employee.role }, SECRET_KEY, {
    expiresIn: "1d",
  });

  return { token, employee };
};
