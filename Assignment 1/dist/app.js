"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logic_1 = require("./logic");
const app = (0, express_1.default)();
const port = 8000;
// 1. Split words API
app.get('/split/:datatype', (req, res) => {
    const inputString = req.params.datatype;
    const revisedString = (0, logic_1.splitWords)(inputString);
    res.json({ revisedString });
});
// 2. Concatenate words API
app.get('/concatenate', (req, res) => {
    const { word1, word2 } = req.query;
    const revisedString = (0, logic_1.concatenateWords)(word1, word2);
    res.json({ revisedString });
});
// 3. Leap year API
app.get('/leap/:year', (req, res) => {
    const year = parseInt(req.params.year);
    const result = (0, logic_1.isLeapYear)(year);
    res.json({ isLeapYear: result });
});
// 4. Secret Handshake API
app.get('/handshake/:number', (req, res) => {
    const number = parseInt(req.params.number);
    const result = (0, logic_1.secretHandshake)(number);
    res.json({ actions: result });
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map