"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const sequelize_1 = require("sequelize");
const app_1 = __importDefault(require("./app"));
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    console.error('DATABASE_URL is not set in the environment variables');
    process.exit(1); // Exit if DATABASE_URL is missing
}
const sequelize = new sequelize_1.Sequelize('weather_db', 'postgres', 'sayalipr', {
    host: 'localhost',
    dialect: 'postgres',
});
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected');
    app_1.default.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
