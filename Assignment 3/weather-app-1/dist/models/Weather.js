"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const sequelize_1 = require("sequelize");
// Initialize Sequelize with the database URL
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL);
class Weather extends sequelize_1.Model {
}
exports.Weather = Weather;
// Define the model for the `weather_data` table
Weather.init({
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weather: {
        type: sequelize_1.DataTypes.JSONB, // Store weather data as JSON
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.fn('NOW'), // Default current timestamp
    },
}, {
    sequelize,
    tableName: 'weather_data', // Name of the table in the database
    timestamps: false, // Disable automatic `createdAt` and `updatedAt` columns
});
// Sync the model with the database to ensure the table exists
sequelize.sync()
    .then(() => console.log('Table created or already exists.'))
    .catch((error) => console.error('Error syncing the table:', error));
exports.default = Weather;
