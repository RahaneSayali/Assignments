import { Router } from "express";
import { createSOW, getSOWById } from "../controllers/createSOW";
import { verifyAuth } from "../middlewares/authmiddleware";
import {
  createPaymentPlan,
  getPaymentPlanBySOWid,
} from "../controllers/sowpaymentplan";
import { createLineItem } from "../controllers/sowlineitems";
import { sendPaymentReminders } from "../controllers/remainder";
import { getSOWPaymentPlans } from "../controllers/paymentplanforCustomer";

const router = Router();

router.post("/create", verifyAuth, createSOW);
router.get("/:id", getSOWById);
//router.get("/sows", getAllSOWs);

router.post("/:sowId/PaymentPlan", createPaymentPlan); //creating
router.get("/:sowId/AllPaymentPlan", getPaymentPlanBySOWid); //getting all

router.post("/:sowId/LineItem", createLineItem); //creating
router.get("/:sowId/LineItem"); //getting

router.post("/send-reminders", sendPaymentReminders);
router.get("/customer/:customerId/sow-payment-plans", getSOWPaymentPlans);
export default router;
