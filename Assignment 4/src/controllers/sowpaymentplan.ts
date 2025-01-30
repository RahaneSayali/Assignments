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

export const getPaymentPlanBySOWid = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sowId } = req.params;

  const parsedSowId = parseInt(sowId, 10); 

  if (isNaN(parsedSowId) || parsedSowId <= 0) {
    res.status(400).json({ message: "Invalid SOW ID provided" });
    return;
  }

  try {
    const paymentPlans = await SOWPaymentPlan.findAll({
      where: { sowId: parsedSowId },
    });

    if (!paymentPlans || paymentPlans.length === 0) {
      res.status(404).json({ message: "no payment plans for this sow id" });
      return;
    }
    res.status(200).json({
      message: "payment plans fetched successfully",
      data: paymentPlans,
    });
  } catch (error) {
    res.status(500).json({ message: "error fetching payment plans", error });
  }
};
