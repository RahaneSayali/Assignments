"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./models/associations");
const sowRoutes_1 = __importDefault(require("./routes/sowRoutes"));
const authmiddleware_1 = require("./middlewares/authmiddleware");
const InvoiceRoutes_1 = __importDefault(require("./routes/InvoiceRoutes")); // Import Invoice Routes
const app = (0, express_1.default)();
const PORT = 8001;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/api/sow", authmiddleware_1.verifyAuth, sowRoutes_1.default);
app.use("/api/reminders", authmiddleware_1.verifyAuth, sowRoutes_1.default);
app.use("/api/invoices", authmiddleware_1.verifyAuth, InvoiceRoutes_1.default);
//app.use("/api/payments", verifyAuth, paymentRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
