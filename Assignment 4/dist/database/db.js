"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("postgres", "postgres", "sayalipr", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
});
try {
    db.authenticate();
    console.log("Connection has been established successfully.");
}
catch (err) {
    console.error("Unable to connect to the database:", err);
}
db.sync();
exports.default = db;
