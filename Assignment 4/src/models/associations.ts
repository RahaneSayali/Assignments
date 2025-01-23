import { Customer } from "./Customer";
import { Organization } from "./Organisation";

Organization.hasMany(Customer);
Customer.belongsTo(Organization);
