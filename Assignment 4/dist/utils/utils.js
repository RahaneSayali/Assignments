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
exports.sendReminder = exports.isOverdue = exports.isToday = exports.getTodayDate = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const moment_1 = __importDefault(require("moment"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getTodayDate = () => {
    return (0, moment_1.default)().startOf("day").toDate(); // Reset to start of the day
};
exports.getTodayDate = getTodayDate;
const isToday = (plannedDate, today) => {
    return (0, moment_1.default)(plannedDate).isSame(today, "day");
};
exports.isToday = isToday;
const isOverdue = (plannedDate, today) => {
    return (0, moment_1.default)(plannedDate).isBefore(today, "day");
};
exports.isOverdue = isOverdue;
const sendReminder = (email, plannedDate, sowId) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Reminder: Payment Due for SOW ID ${sowId}`,
        text: `
          Hello,
    
          This is a friendly reminder that your payment is due for the SOW ID ${sowId}. 
          The planned invoice date is: ${(0, moment_1.default)(plannedDate).format("YYYY-MM-DD")}.
          
          Please ensure that the payment is made as per the agreement.
    
          Thank you,
          Evil Corps`,
    };
    try {
        yield transporter.sendMail(message);
        console.log(`Reminder sent to ${email} for SOW ID ${sowId}`);
    }
    catch (error) {
        console.error("Error sending reminder email:", error);
        throw error;
    }
});
exports.sendReminder = sendReminder;
