import { Request, Response } from "express";
import { processPayment } from "../service/PaymentService";

export const makePayment = async (req: Request, res: Response) => {
  try {
    const { invoiceId, amount } = req.body;
    const payment = await processPayment(Number(invoiceId), amount);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
