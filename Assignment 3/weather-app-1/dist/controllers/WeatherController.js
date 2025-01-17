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
exports.saveWeatherMapping = void 0;
const Weather_1 = require("../models/Weather");
const WeatherService_1 = require("../services/WeatherService");
const moment_1 = __importDefault(require("moment"));
// export const saveWeatherMapping = async (req: Request, res: Response) => {
//   const cities = req.body;
//   try {
//     const weatherData = [];
//     for (const cityObj of cities) {
//       const { city, country } = cityObj;
//       console.log(`Fetching coordinates for ${city}, ${country}`);
//       // Fetch coordinates
//       let coordinates;
//       try {
//         coordinates = await fetchCoordinates(city, country);
//         console.log('Coordinates:', coordinates); // Log coordinates to debug
//       } catch (error) {
//         console.error(`Error fetching coordinates for ${city}, ${country}:`, error);
//         // Skip this city and continue with the next one
//         continue;
//       }
//       // Ensure coordinates are valid
//       if (coordinates && coordinates.length > 0) {
//         const { latitude, longitude } = coordinates[0]; // Access the first item in the array
//         if (!latitude || !longitude) {
//           console.error(`Invalid coordinates for ${city}, ${country}`);
//           continue; // Skip this city and continue with the next one
//         }
//         // Fetch weather data for the coordinates
//         let weather;
//         try {
//           weather = await fetchWeatherData(latitude,longitude);
//         console.log(weather)
//         } catch (error) {
//           console.error(`Error fetching weather data for ${city}, ${country}:`, error);
//           continue; // Skip this city and continue with the next one
//         }
//         // Handle case where weather data is missing
//         if (!weather) {
//           console.error(`No weather data available for ${city}, ${country}`);
//           continue; // Skip this city and continue with the next one
//         }
//         // Save the data into the database
//         try {
//           const newWeather = await Weather.create({
//             city,
//             country,
//             weather: weather, // Assuming you want to save the full weather data
//             latitude: parseFloat(latitude),
//             longitude: parseFloat(longitude),
//             time: moment().format(),
//           });
//           weatherData.push(newWeather);
//         } catch (dbError) {
//           console.error(`Error saving weather data for ${city}, ${country}:`, dbError);
//           continue; // Skip saving in case of DB errors
//         }
//       } else {
//         console.error(`No coordinates found for ${city}, ${country}`);
//         continue;
//       }
//     }
//     // Return the saved weather data
//     res.status(200).json(weatherData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error occurred while fetching weather data.' });
//   }
// };
// import { Request, Response } from 'express';
// import { Weather } from '../models/Weather';
// import { fetchCoordinates, fetchWeatherData } from '../services/WeatherService';
// import moment from 'moment';
const saveWeatherMapping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.body;
    try {
        // Ensure the table is created if it doesn't exist
        yield Weather_1.Weather.sync(); // Ensure table is created if it doesn't exist
        const weatherData = [];
        for (const cityObj of cities) {
            const { city, country } = cityObj;
            console.log(`Fetching coordinates for ${city}, ${country}`);
            // Fetch coordinates
            let coordinates;
            try {
                coordinates = yield (0, WeatherService_1.fetchCoordinates)(city, country);
                console.log('Coordinates:', coordinates); // Log coordinates to debug
            }
            catch (error) {
                console.error(`Error fetching coordinates for ${city}, ${country}:`, error);
                // Skip this city and continue with the next one
                continue;
            }
            // Ensure coordinates are valid
            if (coordinates && coordinates.length > 0) {
                const { latitude, longitude } = coordinates[0]; // Access the first item in the array
                if (!latitude || !longitude) {
                    console.error(`Invalid coordinates for ${city}, ${country}`);
                    continue; // Skip this city and continue with the next one
                }
                // Fetch weather data for the coordinates
                let weather;
                try {
                    weather = yield (0, WeatherService_1.fetchWeatherData)(latitude, longitude);
                    console.log(weather);
                }
                catch (error) {
                    console.error(`Error fetching weather data for ${city}, ${country}:`, error);
                    continue; // Skip this city and continue with the next one
                }
                // Handle case where weather data is missing
                if (!weather) {
                    console.error(`No weather data available for ${city}, ${country}`);
                    continue; // Skip this city and continue with the next one
                }
                // Save the data into the database
                try {
                    const newWeather = yield Weather_1.Weather.create({
                        city,
                        country,
                        weather: weather, // Save the entire weather object as JSON
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        time: (0, moment_1.default)().format(), // Current timestamp
                    });
                    weatherData.push(newWeather);
                }
                catch (dbError) {
                    console.error(`Error saving weather data for ${city}, ${country}:`, dbError);
                    continue; // Skip saving in case of DB errors
                }
            }
            else {
                console.error(`No coordinates found for ${city}, ${country}`);
                continue;
            }
        }
        // Return the saved weather data
        res.status(200).json(weatherData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while fetching weather data.' });
    }
});
exports.saveWeatherMapping = saveWeatherMapping;
