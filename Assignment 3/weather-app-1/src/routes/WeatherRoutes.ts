import express from 'express';
import { saveWeatherMapping ,getWeatherDashboard } from '../controllers/WeatherController';

const router = express.Router();

router.post('/SaveWeatherMapping', saveWeatherMapping);

router.get('/weatherDashboard', getWeatherDashboard);

export default router;
