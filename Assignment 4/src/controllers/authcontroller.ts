import { Request, Response } from "express";
import { Organization } from "../models/Organisation";
import { Customer } from "../models/Customer";
import {
  registerOrganization,
  registerCustomer,
  loginUser,
} from "../service/authservice";

export const registerOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);
    const organization = await registerOrganization(req.body);
    res.status(201).json({
      message: "Organization registered successfully",
      data: organization,
    });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
    else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const registerCustomerController = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await registerCustomer(req.body);
    res
      .status(201)
      .json({ message: "Customer registered successfully", data: customer });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
    else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const { user, token } = await loginUser(email, password, role);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
    else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
