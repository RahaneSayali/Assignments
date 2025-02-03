"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createEmp_1 = require("../controllers/createEmp");
const router = (0, express_1.Router)();
// Register employee route
router.post("/register", createEmp_1.registerEmployeeController);
exports.default = router;
