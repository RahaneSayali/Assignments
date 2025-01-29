"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = require("./Customer");
const Organisation_1 = require("./Organisation");
const SOWpaymentplan_1 = require("./SOWpaymentplan");
Organisation_1.Organization.hasMany(Customer_1.Customer);
Customer_1.Customer.belongsTo(Organisation_1.Organization);
SOWpaymentplan_1.SOWPaymentPlan.belongsTo(Customer_1.Customer, { foreignKey: "CustomerId" });
