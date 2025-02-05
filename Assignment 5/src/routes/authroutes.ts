import express from "express";
import { register, login, logout } from "../controllers/authcontroller";
import { authenticate } from "../middleware/auth";
import { createTimesheetController } from "../controllers/TimeSheetController";
import { generateReport } from "../services/ReportService";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

router.post("/timesheets", authenticate, createTimesheetController);
router.get("/report", authenticate, async (req, res) => {
  await generateReport(res);
});
export default router;
