import { Router } from "express";
import {
  adminLogin,
  adminReg,
  userLogin,
  userReg,
} from "../controller/authController";
import { authenticate } from "../middlewares/auth";

const authRouter = Router();

authRouter.post("/user/register", userReg);
authRouter.post("/user/login", authenticate, userLogin);

authRouter.post("/admin/register", adminReg);
authRouter.post("/admin/login", authenticate, adminLogin);
export { authRouter };
