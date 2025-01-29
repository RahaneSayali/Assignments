import { Request, Response, NextFunction } from "express";
import { SOW } from "../models/SOWManage";
import { Customer } from "../models/Customer";
import { Organization } from "../models/Organisation";

export const createSOW = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const organizationId = (req as any).user.id;
  const userRole = (req as any).user.role;
  if (userRole !== "organization") {
    res.status(403).json({ message: "Only organizations can create a SOW." });
    return;
  }
  const {
    title,
    description,
    customerId,
    invoiceEmail,
    customerPONumber,
    customerSONumber,
    validityFrom,
    validityUpto,
    totalValue,
    currency,
  } = req.body;

  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    const sow = await SOW.create({
      title: title,
      description: description,
      customerId: customerId,
      InvoiceEmailAddresses: invoiceEmail,
      customerPoNumber: customerPONumber,
      customerSoWNumber: customerSONumber,
      ValidityFrom: validityFrom,
      ValidityUpto: validityUpto,
      totalValue: totalValue,
      currency: currency,
    });

    res.status(201).json({
      message: "SOW created successfully!",
      data: sow,
    });
  } catch (error) {
    console.error("Error creating SOW:", error);
    res.status(500).json({ message: "Error creating SOW" });
  }
};

export const getSOWById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sowId = req.params.id;

  try {
    const sow = await SOW.findByPk(sowId);

    if (!sow) {
      res.status(404).json({ message: "SOW not found" });
      return;
    }

    res.status(200).json(sow);
  } catch (error) {
    console.error("Error fetching SOW:", error);
    res.status(500).json({ message: "Error fetching SOW" });
  }
};

// export const getAllSOWs = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const organizationId = req.query.organizationId as string;
//   try {
//     const sows = organizationId
//       ? await SOW.findAll({ where: { organizationId } })
//       : await SOW.findAll();

//     res.status(200).json(sows);
//   } catch (error) {
//     console.error("Error fetching SOWs:", error);
//     res.status(500).json({ message: "Error fetching SOWs" });
//   }
// };
