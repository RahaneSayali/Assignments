"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSOW_1 = require("../controllers/createSOW");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const sowpaymentplan_1 = require("../controllers/sowpaymentplan");
const sowlineitems_1 = require("../controllers/sowlineitems");
const remainder_1 = require("../controllers/remainder");
const paymentplanforCustomer_1 = require("../controllers/paymentplanforCustomer");
const router = (0, express_1.Router)();
router.post("/create", authmiddleware_1.verifyAuth, createSOW_1.createSOW);
router.get("/:id", createSOW_1.getSOWById);
//router.get("/sows", getAllSOWs);
router.post("/:sowId/PaymentPlan", sowpaymentplan_1.createPaymentPlan); //creating
router.get("/:sowId/AllPaymentPlan", sowpaymentplan_1.getPaymentPlanBySOWid); //getting all
router.post("/:sowId/LineItem", sowlineitems_1.createLineItem); //creating
router.get("/:sowId/LineItem"); //getting
router.post("/send-reminders", remainder_1.sendPaymentReminders); //checks due date and sends reminders
router.get("/customer/:customerId/sow-payment-plans", paymentplanforCustomer_1.getSOWPaymentPlans); //client side
exports.default = router;
router.put("/customer/update-status/:sowPaymentPlanItemId", paymentplanforCustomer_1.updateInvoice);
