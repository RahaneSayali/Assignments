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
exports.adminLogin = exports.adminReg = exports.userLogin = exports.userReg = void 0;
const userService_1 = require("../service/userService");
const userService_2 = require("../service/userService");
const adminService_1 = require("../service/adminService");
const userReg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const result = yield (0, userService_1.regUser)(name, email, password);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.userReg = userReg;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, userService_2.loginUser)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(401).json({ error: error });
    }
});
exports.userLogin = userLogin;
const adminReg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        const result = yield (0, adminService_1.regAdmin)(name, email, password, role);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.adminReg = adminReg;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, adminService_1.loginAdmin)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(401).json({ error: error });
    }
});
exports.adminLogin = adminLogin;
//# sourceMappingURL=authController.js.map