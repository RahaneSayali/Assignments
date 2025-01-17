import express from 'express';
import { saveWeatherMapping } from '../controllers/WeatherController';

const router = express.Router();

router.post('/SaveWeatherMapping', saveWeatherMapping);

export default router;
