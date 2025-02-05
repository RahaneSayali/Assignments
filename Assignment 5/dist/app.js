"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const db_1 = __importDefault(require("./config/db"));
const associations_1 = __importDefault(require("./models/associations"));
(0, associations_1.default)();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT;
app.use("/api/auth", authroutes_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
db_1.default
    .sync({ alter: true })
    .then(() => {
    console.log("Database synced successfully");
})
    .catch((error) => {
    console.error("Error syncing database:", error);
});
exports.default = app;
