import Employee from "../models/EmpModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Shift } from "../models/ShiftModel";
config();

const SECRET_KEY = process.env.JWT_SECRET || "default-secret-key";

export const loginEmployee = async (email: string, password: string) => {
  const employee = await Employee.findOne({ where: { email } });

  if (!employee) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: employee.id, role: employee.role }, SECRET_KEY, {
    expiresIn: "1d",
  });
  // console.log("Employee ID Type:", typeof employee.id);
  // console.log("Employee ID Value:", employee.id);
  const shift = await Shift.create({
    employeeId: employee.id,
    startTime: new Date(),
    actualHours: 0,
  });
  return { token, employee, shift };
};
