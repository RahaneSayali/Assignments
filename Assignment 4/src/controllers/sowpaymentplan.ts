import { Request, Response } from "express";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";
import { createSOWPaymentPlan } from "../service/sowpaymentplan";
import { Op } from "sequelize";
export const createPaymentPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sowId } = req.params;
  const { plannedInvoiceDate, totalActualAmount } = req.body;

  try {
    const paymentPlan = await createSOWPaymentPlan(
      Number(sowId),
      plannedInvoiceDate,
      totalActualAmount
    );
    res.status(201).json({
      message: "Payment plan created successfully!",
      data: paymentPlan,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "unknown error" });
    }
  }
};
