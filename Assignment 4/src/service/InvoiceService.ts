import { Invoice } from "../models/Invoice";
import Payment from "../models/Payment";
import InvoiceLineItem from "../models/InvoiceLineItems";
import { SOWPaymentPlan } from "../models/SOWpaymentplan";

export const createInvoice = async (customerId: number, totalValue: number) => {
  // Fetch the associated SOWPaymentPlan, or if needed, a default value for sowId
  const sowPaymentPlan = await SOWPaymentPlan.findOne({
    where: { CustomerId: customerId }, // Assuming you can fetch it this way, adjust based on your logic
  });

  if (!sowPaymentPlan) {
    throw new Error("SOW Payment Plan not found for the customer");
  }

  // Invoice fields
  const invoiceAmount = totalValue * 0.9; // Just an example, calculate this based on your logic
  const invoiceTaxAmount = totalValue * 0.1; // Example, adjust tax calculation

  return await Invoice.create({
    customerId: customerId,
    sowId: sowPaymentPlan.id, // Associating with the SOW Payment Plan
    totalInvoiceValue: totalValue,
    status: "Drafted",
    invoiceSentOn: new Date(),
    invoiceAmount: invoiceAmount,
    invoiceTaxAmount: invoiceTaxAmount,
    paymentReceivedOn: null, // Initially, no payment is received
    invoiceVersionNo: 1, // Starting with version 1
    paymentId: null, // No payment ID initially
  });
};

export const updateInvoiceStatus = async (
  invoiceId: number,
  status: string
) => {
  const invoice = await Invoice.findByPk(invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  invoice.status = status as "Drafted" | "Cancelled" | "Approved";
  await invoice.save();
  return invoice;
};
