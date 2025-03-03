"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const auth_1 = require("../middlewares/auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/user/register", authController_1.userReg);
authRouter.post("/user/login", auth_1.authenticate, authController_1.userLogin);
authRouter.post("/admin/register", authController_1.adminReg);
authRouter.post("/admin/login", auth_1.authenticate, authController_1.adminLogin);
//# sourceMappingURL=authRoutes.js.map