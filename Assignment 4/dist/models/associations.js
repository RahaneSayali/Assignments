"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = require("./Customer");
const Organisation_1 = require("./Organisation");
const SOWpaymentplan_1 = require("./SOWpaymentplan");
const SOWLineitems_1 = require("./SOWLineitems");
const Invoice_1 = require("./Invoice");
const Payment_1 = require("./Payment");
Organisation_1.Organization.hasMany(Customer_1.Customer);
Customer_1.Customer.belongsTo(Organisation_1.Organization);
Customer_1.Customer.hasMany(SOWpaymentplan_1.SOWPaymentPlan, { foreignKey: "CustomerId" });
SOWpaymentplan_1.SOWPaymentPlan.belongsTo(Customer_1.Customer, { foreignKey: "CustomerId" });
SOWpaymentplan_1.SOWPaymentPlan.hasMany(SOWLineitems_1.SOWPaymentPlanItem, { foreignKey: "sowPaymentPlanId" });
SOWLineitems_1.SOWPaymentPlanItem.belongsTo(SOWpaymentplan_1.SOWPaymentPlan, {
    foreignKey: "sowPaymentPlanId",
});
Invoice_1.Invoice.hasMany(Payment_1.Payment, { foreignKey: "InvoiceId", as: "payments" });
Payment_1.Payment.belongsTo(Invoice_1.Invoice, { foreignKey: "InvoiceId", as: "invoice" });
