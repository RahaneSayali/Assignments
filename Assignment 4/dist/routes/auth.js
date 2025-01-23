"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authcontroller_1 = require("../controllers/authcontroller");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const router = (0, express_1.Router)();
router.post("/login", authcontroller_1.loginController);
router.post("/register/customer", authcontroller_1.registerCustomerController);
router.post("/register/organization", authcontroller_1.registerOrganizationController);
router.get("/profile", authmiddleware_1.verifyAuth, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});
exports.default = router;
