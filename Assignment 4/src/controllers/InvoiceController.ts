import { Request, Response } from "express";
import { createInvoice, updateInvoiceStatus } from "../service/InvoiceService";

export const generateInvoice = async (req: Request, res: Response) => {
    try {
      const { customerId, totalValue } = req.body;
  
      // Generate the invoice
      const invoice = await createInvoice(customerId, totalValue);
  
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };


export const changeInvoiceStatus = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.params;
    const { status } = req.body;
    const updatedInvoice = await updateInvoiceStatus(Number(invoiceId), status);
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
