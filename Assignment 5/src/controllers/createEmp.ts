import { Request, Response } from "express";
import { createEmployee } from "../services/createEmp";

export const registerEmployeeController = async (
  req: Request,
  res: Response
) => {
  const { name, email, password, assignedShiftHours, role } = req.body;

  try {
    const employee = await createEmployee(
      name,
      email,
      password,
      assignedShiftHours,
      role
    );
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
