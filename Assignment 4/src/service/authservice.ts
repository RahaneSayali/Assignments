import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Organization } from "../models/Organisation";
import { Customer } from "../models/Customer";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/config";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (id: number, role: string): string => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};

export const registerOrganization = async (orgData: any) => {
  const { email, password, ...rest } = orgData;
  console.log(email);

  const hashedPassword = await hashPassword(password);
  const newOrg = await Organization.create({
    email,
    ...rest,
    password: hashedPassword,
  });
  return newOrg;
};

export const registerCustomer = async (custData: any) => {
  const { email, password, OrganizationId, ...rest } = custData;

  const hashedPassword = await hashPassword(password);

  const newCustomer = await Customer.create({
    email,
    OrganizationId: OrganizationId,
    ...rest,
    password: hashedPassword,
  });
  return newCustomer;
};

export const loginUser = async (
  email: string,
  password: string,
  role: string
) => {
  let user;

  if (role === "organization") {
    user = await Organization.findOne({ where: { email } });
  } else if (role === "customer") {
    user = await Customer.findOne({ where: { email } });
  }

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user.id, role);
  return { user, token };
};
