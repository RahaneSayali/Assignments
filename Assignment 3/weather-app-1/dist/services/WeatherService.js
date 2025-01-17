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
exports.fetchWeatherData = exports.fetchCoordinates = void 0;
const axios_1 = __importDefault(require("axios"));
const GEOCODING_API_URL = 'https://api.api-ninjas.com/v1/geocoding';
const WEATHER_API_URL = 'https://weatherapi-com.p.rapidapi.com/current.json';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const GEO_API_KEY = process.env.GEO_API_KEY;
// Fetch coordinates using GeoCoding API
const fetchCoordinates = (city, country) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(GEOCODING_API_URL, {
        params: { city, country },
        headers: { 'X-Api-Key': GEO_API_KEY },
    });
    if (response.data.length === 0) {
        throw new Error(`Coordinates not found for ${city}, ${country}`);
    }
    return response.data; // Return the first match
});
exports.fetchCoordinates = fetchCoordinates;
// Fetch weather data using the Weather API
const fetchWeatherData = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    if (!latitude || !longitude) {
        throw new Error('Invalid coordinates');
    }
    const query = latitude + longitude;
    const response = yield axios_1.default.get(`${WEATHER_API_URL}?q=${query}`, {
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
        },
    });
    const weatherData = response.data;
    const result = weatherData.current.condition.text;
    console.log("result", result);
    return result;
});
exports.fetchWeatherData = fetchWeatherData;
