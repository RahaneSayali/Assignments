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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerCustomer = exports.registerOrganization = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Organisation_1 = require("../models/Organisation");
const Customer_1 = require("../models/Customer");
const config_1 = require("../config/config");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
};
exports.verifyToken = verifyToken;
const registerOrganization = (orgData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = orgData, rest = __rest(orgData, ["email", "password"]);
    console.log(email);
    const hashedPassword = yield (0, exports.hashPassword)(password);
    const newOrg = yield Organisation_1.Organization.create(Object.assign(Object.assign({ email }, rest), { password: hashedPassword }));
    return newOrg;
});
exports.registerOrganization = registerOrganization;
const registerCustomer = (custData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, organizationId } = custData, rest = __rest(custData, ["email", "password", "organizationId"]);
    const hashedPassword = yield (0, exports.hashPassword)(password);
    const newCustomer = yield Customer_1.Customer.create(Object.assign(Object.assign({ email, organizationId: organizationId }, rest), { password: hashedPassword }));
    return newCustomer;
});
exports.registerCustomer = registerCustomer;
const loginUser = (email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    if (role === "organization") {
        user = yield Organisation_1.Organization.findOne({ where: { email } });
    }
    else if (role === "customer") {
        user = yield Customer_1.Customer.findOne({ where: { email } });
    }
    if (!user) {
        throw new Error("User not found");
    }
    const validPassword = yield (0, exports.comparePassword)(password, user.password);
    if (!validPassword) {
        throw new Error("Invalid password");
    }
    const token = (0, exports.generateToken)(user.id, role);
    return { user, token };
});
exports.loginUser = loginUser;
