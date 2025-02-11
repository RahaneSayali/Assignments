"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = require("./routes/authRoutes");
const bookRoutes_1 = require("./routes/bookRoutes");
const authorRoutes_1 = require("./routes/authorRoutes");
const reviewRoutes_1 = require("./routes/reviewRoutes");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.authRouter);
app.use("/Books", bookRoutes_1.bookRouter);
app.use("/Authors", authorRoutes_1.authorRouter);
app.use("/Reviews", reviewRoutes_1.reviewRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
