"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic_1 = require("./logic");
// Call the function to create the table if it doesn't exist
(0, logic_1.createTableIfNotExists)().catch((err) => {
    console.error('Unexpected error:', err);
});
