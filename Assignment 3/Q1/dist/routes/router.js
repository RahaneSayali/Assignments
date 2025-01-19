"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherController_1 = require("../controllers/weatherController");
const weatherController_2 = require("../controllers/weatherController");
const router = (0, express_1.Router)();
router.post("/weather", weatherController_1.getWeatherData);
router.get('/api/weatherDashboard', weatherController_2.getWeatherDashboard);
router.post('/api/weathermapping', weatherController_1.getemailData);
exports.default = router;
