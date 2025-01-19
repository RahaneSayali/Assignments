import {Router} from 'express';
import {Request,Response} from 'express';
import{ getWeatherData} from "../controllers/weatherController"
import { getWeatherDashboard } from '../controllers/weatherController';
const router=Router();

router.post("/weather", getWeatherData);
router.get('/api/weatherDashboard', getWeatherDashboard);

export default router;