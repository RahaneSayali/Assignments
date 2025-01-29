import { Customer } from "./Customer";
import { Organization } from "./Organisation";
import { SOWPaymentPlan } from "./SOWpaymentplan";
Organization.hasMany(Customer);
Customer.belongsTo(Organization);
SOWPaymentPlan.belongsTo(Customer, { foreignKey: "CustomerId" });
