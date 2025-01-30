"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaymentReminders = void 0;
const SOWpaymentplan_1 = require("../models/SOWpaymentplan");
const Customer_1 = require("../models/Customer");
const utils_1 = require("../utils/utils");
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
dotenv_1.default.config();
const sendPaymentReminders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = (0, moment_timezone_1.default)().tz("Asia/Kolkata").startOf("day").toDate();
        // Fetch all payment plans where PlannedInvoiceDate is today
        const duePayments = yield SOWpaymentplan_1.SOWPaymentPlan.findAll({
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("DATE", sequelize_1.Sequelize.col("PlannedInvoiceDate")), today),
            include: [{ model: Customer_1.Customer, attributes: ["email"] }],
        });
        console.log("Today’s Date:", today);
        console.log("Due Payments:", JSON.stringify(duePayments, null, 2));
        if (duePayments.length === 0) {
            res.status(200).json({ message: "No payments due today." });
            return;
        }
        for (const payment of duePayments) {
            const { sowId, CustomerId, PlannedInvoiceDate } = payment;
            // Fetch customer email
            const customer = yield Customer_1.Customer.findByPk(CustomerId);
            if (customer && customer.email) {
                yield (0, utils_1.sendReminder)(customer.email, PlannedInvoiceDate, sowId);
            }
        }
        res.status(200).json({ message: "Reminders sent successfully." });
    }
    catch (error) {
        console.error("Error sending reminders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.sendPaymentReminders = sendPaymentReminders;
