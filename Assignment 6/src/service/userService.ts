import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export const regUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return {
        error: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    return {
      message: "User created successfully",
      userId: newUser.id,
      token,
    };
  } catch (error: any) {
    console.error("Registration failed: ", error);
    return {
      error: error.message || "reg falied",
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id, role: "user" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { message: "Login successful", token };
  } catch (error) {
    throw new Error("Login failed: " + error);
  }
};
