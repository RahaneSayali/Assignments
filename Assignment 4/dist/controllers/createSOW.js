"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSOWById = exports.createSOW = void 0;
const SOWManage_1 = require("../models/SOWManage");
const Customer_1 = require("../models/Customer");
const createSOW = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const organizationId = req.user.id;
    const userRole = req.user.role;
    if (userRole !== "organization") {
        res.status(403).json({ message: "Only organizations can create a SOW." });
        return;
    }
    const { title, description, customerId, invoiceEmail, customerPONumber, customerSONumber, validityFrom, validityUpto, totalValue, currency, } = req.body;
    try {
        const customer = yield Customer_1.Customer.findByPk(customerId);
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        const sow = yield SOWManage_1.SOW.create({
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
    }
    catch (error) {
        console.error("Error creating SOW:", error);
        res.status(500).json({ message: "Error creating SOW" });
    }
});
exports.createSOW = createSOW;
const getSOWById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sowId = req.params.id;
    try {
        const sow = yield SOWManage_1.SOW.findByPk(sowId);
        if (!sow) {
            res.status(404).json({ message: "SOW not found" });
            return;
        }
        res.status(200).json(sow);
    }
    catch (error) {
        console.error("Error fetching SOW:", error);
        res.status(500).json({ message: "Error fetching SOW" });
    }
});
exports.getSOWById = getSOWById;
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
