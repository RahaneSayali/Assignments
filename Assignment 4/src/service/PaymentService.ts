import { Invoice } from "../models/Invoice";
import Payment from "../models/Payment";

export const processPayment = async (invoiceId: number, amount: number) => {
  const invoice = await Invoice.findByPk(invoiceId);
  if (!invoice) throw new Error("Invoice not found");

  const payment = await Payment.create({
    InvoiceId: invoiceId,
    Amount: amount,
    PaymentDate: new Date(),
  });

  const totalPaid = await Payment.sum("Amount", {
    where: { InvoiceId: invoiceId },
  });
  if (totalPaid >= invoice.totalInvoiceValue) {
    invoice.status = "Approved";
    invoice.paymentReceivedOn = new Date();
    await invoice.save();
  }

  return payment;
};
