import { Router } from "express";
import {
  loginController,
  registerCustomerController,
  registerOrganizationController,
} from "../controllers/authcontroller";
import { verifyAuth } from "../middlewares/authmiddleware";

const router = Router();

router.post("/login", loginController);
router.post("/register/customer", registerCustomerController);
router.post("/register/organization", registerOrganizationController);

router.get("/profile", verifyAuth, (req, res) => {
  res.json({ message: "Protected route", user: (req as any).user });
});

export default router;
