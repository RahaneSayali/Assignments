"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logic_1 = require("./logic"); // Importing the array functions from logic.ts
const app = (0, express_1.default)();
const port = 8005;
app.use(body_parser_1.default.json()); // Middleware to parse JSON bodies
app.post('/array-functions', logic_1.arrayFunctions); // Route handling for POST requests to '/array-functions'
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
