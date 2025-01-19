"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 8000;
app.use(body_parser_1.default.json());
app.use("/", router_1.default);
app.listen(PORT, () => console.log("Server started"));
config_1.default.sync({ force: false }) // Set to true to force drop/recreate the table (only for development)
    .then(() => {
    console.log('Weather table created (if it did not exist)');
})
    .catch((error) => {
    console.error('Error creating weather table:', error);
});
