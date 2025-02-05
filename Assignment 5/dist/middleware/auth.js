"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
// Define a custom interface to extend Request
// interface Employe {
//   id: string;
//   role: string;
// }
// export interface AuthRequest extends Request {
//   employee?: Employe;
// }
const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const token = authHeader.replace("Bearer ", "").trim();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.employee = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authenticate = authenticate;
