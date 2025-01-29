import { Router } from "express";
import { createSOW, getSOWById } from "../controllers/createSOW";
import { verifyAuth } from "../middlewares/authmiddleware";
import { createPaymentPlan } from "../controllers/sowpaymentplan";

const router = Router();

router.post("/create", verifyAuth, createSOW);
router.get("/:id", getSOWById);
//router.get("/sows", getAllSOWs);

router.post("/:sowId/PaymentPlan", createPaymentPlan); //creating
//router.get("/:sowID/PaymentPlan" ) //getting

export default router;
