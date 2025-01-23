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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Organisation_1 = require("../models/Organisation");
const config_1 = require("../config/config");
class AuthService {
    // Hash the password before saving
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10); // Salt rounds
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            return hashedPassword;
        });
    }
    // Verify password against the stored hash
    verifyPassword(plainPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcryptjs_1.default.compare(plainPassword, hashedPassword);
            return isMatch;
        });
    }
    // Create JWT token after successful login
    generateToken(organization) {
        const payload = { id: organization.id, email: organization.email };
        const token = jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    signup(organizationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, gstNo, panNo, legalOrganizationName, invoiceTemplateId, shortName, contactName, displayName, addressId, phone } = organizationData;
            // Check if organization with the same email already exists
            const existingOrganization = yield Organisation_1.Organization.findOne({ where: { email } });
            if (existingOrganization) {
                throw new Error('Organization with this email already exists');
            }
            const hashedPassword = yield this.hashPassword(password);
            const newOrganization = yield Organisation_1.Organization.create({
                email,
                password: hashedPassword, // Save the hashed password
                gstNo,
                panNo,
                legalOrganizationName,
                invoiceTemplateId,
                shortName,
                contactName,
                displayName,
                addressId,
                phone,
                id: ''
            });
            return newOrganization;
        });
    }
}
exports.authService = new AuthService();
