import {Router} from 'express';
import {Request,Response} from 'express';
import{ getWeatherData,getemailData} from "../controllers/weatherController"
import { getWeatherDashboard } from '../controllers/weatherController';

const router=Router();

router.post("/weather", getWeatherData);
router.get('/api/weatherDashboard', getWeatherDashboard);
router.post('/api/weathermapping' , getemailData);
export default router;