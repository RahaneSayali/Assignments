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
exports.loginController = exports.registerCustomerController = exports.registerOrganizationController = void 0;
const authservice_1 = require("../service/authservice");
const registerOrganizationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const organization = yield (0, authservice_1.registerOrganization)(req.body);
        res.status(201).json({
            message: "Organization registered successfully",
            data: organization,
        });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ message: err.message });
        else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});
exports.registerOrganizationController = registerOrganizationController;
const registerCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, authservice_1.registerCustomer)(req.body);
        res
            .status(201)
            .json({ message: "Customer registered successfully", data: customer });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ message: err.message });
        else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});
exports.registerCustomerController = registerCustomerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        const { user, token } = yield (0, authservice_1.loginUser)(email, password, role);
        res.status(200).json({ message: "Login successful", token, user });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ message: err.message });
        else {
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});
exports.loginController = loginController;
