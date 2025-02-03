import { Customer } from "./Customer";
import { Organization } from "./Organisation";
import { SOWPaymentPlan } from "./SOWpaymentplan";
import { SOWPaymentPlanItem } from "./SOWLineitems";
import { Invoice } from "./Invoice";
import { Payment } from "./Payment";

Organization.hasMany(Customer);
Customer.belongsTo(Organization);

Customer.hasMany(SOWPaymentPlan, { foreignKey: "CustomerId" });
SOWPaymentPlan.belongsTo(Customer, { foreignKey: "CustomerId" });

SOWPaymentPlan.hasMany(SOWPaymentPlanItem, { foreignKey: "sowPaymentPlanId" });
SOWPaymentPlanItem.belongsTo(SOWPaymentPlan, {
  foreignKey: "sowPaymentPlanId",
});

Invoice.hasMany(Payment, { foreignKey: "InvoiceId", as: "payments" });
Payment.belongsTo(Invoice, { foreignKey: "InvoiceId", as: "invoice" });
