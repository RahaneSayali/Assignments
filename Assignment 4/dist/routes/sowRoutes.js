"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSOW_1 = require("../controllers/createSOW");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const sowpaymentplan_1 = require("../controllers/sowpaymentplan");
const router = (0, express_1.Router)();
router.post("/create", authmiddleware_1.verifyAuth, createSOW_1.createSOW);
router.get("/:id", createSOW_1.getSOWById);
//router.get("/sows", getAllSOWs);
router.post("/:sowId/PaymentPlan", sowpaymentplan_1.createPaymentPlan); //creating
//router.get("/:sowID/PaymentPlan" ) //getting
exports.default = router;
