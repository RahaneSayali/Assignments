import nodemailer from "nodemailer";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();
import { SOWPaymentPlan } from "../models/SOWpaymentplan";

const getTodayDate = (): Date => {
  return moment().startOf("day").toDate(); // Reset to start of the day
};

const isToday = (plannedDate: Date, today: Date): boolean => {
  return moment(plannedDate).isSame(today, "day");
};

const isOverdue = (plannedDate: Date, today: Date): boolean => {
  return moment(plannedDate).isBefore(today, "day");
};

const sendReminder = async (
  email: string,
  plannedDate: Date,
  sowId: number
): Promise<void> => {
  const transporter = nodemailer.createTransport({
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
          The planned invoice date is: ${moment(plannedDate).format(
            "YYYY-MM-DD"
          )}.
          
          Please ensure that the payment is made as per the agreement.
    
          Thank you,
          Evil Corps`,
  };

  try {
    await transporter.sendMail(message);
    console.log(`Reminder sent to ${email} for SOW ID ${sowId}`);
  } catch (error) {
    console.error("Error sending reminder email:", error);
    throw error;
  }
};
export { getTodayDate, isToday, isOverdue, sendReminder };
