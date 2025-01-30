import { Customer } from "./Customer";
import { Organization } from "./Organisation";
import { SOWPaymentPlan } from "./SOWpaymentplan";
import { SOWPaymentPlanItem } from "./SOWLineitems";
Organization.hasMany(Customer);
Customer.belongsTo(Organization);

Customer.hasMany(SOWPaymentPlan, { foreignKey: "CustomerId" });
SOWPaymentPlan.belongsTo(Customer, { foreignKey: "CustomerId" });

SOWPaymentPlan.hasMany(SOWPaymentPlanItem, { foreignKey: "sowPaymentPlanId" });
SOWPaymentPlanItem.belongsTo(SOWPaymentPlan, {
  foreignKey: "sowPaymentPlanId",
});
