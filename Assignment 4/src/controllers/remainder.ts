import { Request, Response } from "express";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";
import { Customer } from "../models/Customer";
import { getTodayDate, isToday, sendReminder } from "../utils/utils";
import { Op, Sequelize } from "sequelize";
import dotenv from "dotenv";
import moment from "moment-timezone";

dotenv.config();
export const sendPaymentReminders = async (req: Request, res: Response) => {
  try {
    const today = moment().tz("Asia/Kolkata").startOf("day").toDate();

    // Fetch all payment plans where PlannedInvoiceDate is today
    const duePayments = await SOWPaymentPlan.findAll({
      where: Sequelize.where(
        Sequelize.fn("DATE", Sequelize.col("PlannedInvoiceDate")),
        today
      ),
      include: [{ model: Customer, attributes: ["email"] }],
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
      const customer = await Customer.findByPk(CustomerId);
      if (customer && customer.email) {
        await sendReminder(customer.email, PlannedInvoiceDate, sowId);
      }
    }

    res.status(200).json({ message: "Reminders sent successfully." });
  } catch (error) {
    console.error("Error sending reminders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
