import { Request, Response } from "express";
import { registerEmployee, loginEmployee } from "../services/authservice";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, assignedShiftHours, role } = req.body;
        const employee = await registerEmployee(name, email, password, assignedShiftHours, role);
        res.status(201).json({ message: "Employee registered successfully", employee });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, employee } = await loginEmployee(email, password);
        res.status(200).json({ message: "Login successful", token, employee });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
