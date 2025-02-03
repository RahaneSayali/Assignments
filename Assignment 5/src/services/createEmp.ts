import Employee from "../models/EmpModel";
import bcrypt from "bcryptjs";
import { ErrorHandler } from "../utils/error"; // A custom error handler

import { v4 as uuidv4 } from "uuid";


export const createEmployee = async (
  name: string,
  email: string,
  password: string,
  assignedShiftHours: number,
  role: string
) => {
  const existingEmployee = await Employee.findOne({ where: { email } });
  if (existingEmployee) {
    throw new ErrorHandler(400, "Employee already exists.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new employee
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
