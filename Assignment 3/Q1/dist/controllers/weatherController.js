"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getemailData = exports.getWeatherDashboard = exports.getWeatherData = void 0;
const axios_1 = __importDefault(require("axios"));
const sequelize_1 = require("sequelize");
const weather_1 = __importDefault(require("../models/weather"));
const config_1 = __importDefault(require("../db/config"));
const email_1 = require("../email/email");
const getWeatherData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const cities = data.cities;
    const results = [];
    console.log(data);
    console.log(cities);
    for (const cityObj of cities) {
        try {
            const response = yield axios_1.default.get(`https://api.api-ninjas.com/v1/geocoding`, {
                params: {
                    city: cityObj.city,
                    country: cityObj.country
                },
                headers: {
                    'X-Api-Key': 'Bc3eaVXVFMMVzooxoMd0dw==FEHKuquKhGFVY0Uv'
                }
            });
            if (Array.isArray(response.data) && response.data.length > 0) {
                const locationData = response.data[0];
                const { latitude, longitude } = locationData;
                console.log(`Fetched coordinates for ${cityObj.city}: Latitude = ${latitude}, Longitude = ${longitude}`);
                // Ensure latitude and longitude are not null
                if (latitude == null || longitude == null) {
                    console.error(`No valid latitude or longitude found for city: ${cityObj.city}`);
                    continue; // Skip this city if geolocation is invalid
                }
                results.push({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude
                });
                const resp = yield axios_1.default.get("https://weatherapi-com.p.rapidapi.com/current.json", {
                    params: {
                        q: `${locationData.latitude},${locationData.longitude}`
                    },
                    headers: {
                        'X-RapidAPI-Key': 'e07ffe2e60mshd846c724dd84142p1c08b7jsn1c2cb45b5fb6',
                        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                    }
                });
                const weatherData = resp.data;
                results.push({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    weather: `${weatherData.current.condition.text}`
                });
                yield weather_1.default.create({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude.toString(),
                    longitude: locationData.longitude.toString(),
                    weather: `${weatherData.current.condition.text}`,
                    createdAt: new Date(),
                });
            }
            else {
                console.log(`No data found for city: ${cityObj.city}`);
            }
        }
        catch (error) {
            console.log(`Error fetching data for city: ${cityObj.city}`, error);
        }
    }
    res.send(results);
    console.log(results);
});
exports.getWeatherData = getWeatherData;
const getWeatherDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.query;
    try {
        let weatherData;
        if (city) {
            weatherData = yield weather_1.default.findAll({
                where: {
                    city: {
                        [sequelize_1.Op.iLike]: `%${city}%`
                    }
                },
                order: [['createdAt', 'DESC']]
            });
        }
        else {
            weatherData = yield weather_1.default.findAll({
                attributes: [
                    'id',
                    'city',
                    'country',
                    'weather',
                    [config_1.default.fn('MAX', config_1.default.col('createdAt')), 'date']
                ],
                group: ['id', 'city', 'country', 'weather'],
                order: [[config_1.default.fn('MAX', config_1.default.col('createdAt')), 'DESC']]
            });
        }
        res.json(weatherData);
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getWeatherDashboard = getWeatherDashboard;
const getemailData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city } = req.body;
        if (!city) {
            res.status(400).json({ error: 'City is required' });
            return;
        }
        // Fetch data from the database
        const weatherData = yield weather_1.default.findAll({
            where: { city },
            order: [['createdAt', 'DESC']]
        });
        if (weatherData.length === 0) {
            res.status(404).json({ error: 'No data found for the specified city' });
            return;
        }
        // Format the data into an HTML table
        const emailContent = `
        <html>
        <body>
            <table border="1">
                <tr>
                    <th>Id</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>Weather</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                ${weatherData.map(data => `
                <tr>
                    <td>${data.id}</td>
                    <td>${data.city}</td>
                    <td>${data.country}</td>
                    <td>${data.updatedAt}</td>
                    <td>${data.createdAt}</td>
                    <td>${data.weather}</td>
                    <td>${data.latitude}</td>
                    <td>${data.longitude}</td>
                </tr>
                `).join('')}
            </table>
        </body>
        </html>
      `;
        // Send the email
        (0, email_1.sendWeatherEmail)(emailContent, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to send email' });
            }
            else {
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
exports.getemailData = getemailData;
