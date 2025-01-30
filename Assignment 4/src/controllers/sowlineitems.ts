import { Request, Response } from "express";
import { createLineItemService } from "../service/lineitemservice";

export const createLineItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sowId } = req.params;
  const { sowPaymentPlanId, orderId, particular, rate, unit, total } = req.body;

  try {
    if (isNaN(Number(sowId)) || Number(sowId) <= 0) {
      res.status(400).json({ message: "Invalid SOW ID provided" });
      return;
    }
    console.log("Received line item data:", req.body);
    
    const lineItem = await createLineItemService(
      sowPaymentPlanId,
      Number(sowId),
      orderId,
      particular,
      rate,
      unit,
      total
    );

    res.status(201).json({
      message: "Line item created successfully",
      data: lineItem,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: " error creating line items" });
    }
  }
};
