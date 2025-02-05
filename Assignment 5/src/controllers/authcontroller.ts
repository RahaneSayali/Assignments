import { Request, Response } from "express";
import { loginEmployee } from "../services/authservice";
import { createEmployee } from "../services/createEmp";
import Shift from "../models/ShiftModel";
import { DATE } from "sequelize";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, assignedShiftHours, role } = req.body;
    const employee = await createEmployee(
      name,
      email,
      password,
      assignedShiftHours,
      role
    );
    res
      .status(201)
      .json({ message: "Employee registered successfully", employee });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, employee, shift } = await loginEmployee(email, password);
    res
      .status(200)
      .json({ message: "Login successful", token, employee, shift });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).employee?.id;
    if (!userId) {
      res.status(400).json({ message: "No employee ID found" });
      return;
    }
    const shift = await Shift.findOne({
      where: { employeeId: userId, endTime: null },
    });

    if (!shift) {
      res.status(400).json({ error: "Employee is not on a shift" });
      return;
    }

    const endTime = new Date();
    const startTime = new Date(shift.startTime);
    const actualHours =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    await shift.update({ endTime, actualHours });
    res
      .status(200)
      .json({
        message: "Employee logged out successfully",
        endTime,
        actualHours,
      });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
