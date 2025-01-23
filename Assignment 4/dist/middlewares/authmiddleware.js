"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const authservice_1 = require("../service/authservice");
const verifyAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.json({ message: "Access denied. No token provided." });
        return;
    }
    try {
        const decoded = (0, authservice_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.verifyAuth = verifyAuth;
