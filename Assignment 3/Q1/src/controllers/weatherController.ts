import { Request, Response } from "express";
import axios from 'axios'

import { Op } from "sequelize";
import Weather from "../models/weather"
import sequelize from "../db/config";

export const getWeatherData = async (req: Request, res: Response) : Promise<void> => {
    const data = req.body;
    const cities = data.cities;

    const results = [];
    console.log(data)
    console.log(cities)
    
   for (const cityObj of cities) {
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding`, {
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

                const resp = await axios.get("https://weatherapi-com.p.rapidapi.com/current.json", {
                    params: {
                        q: `${locationData.latitude},${locationData.longitude}`
                    },
                    headers: {
                        'X-RapidAPI-Key': 'e07ffe2e60mshd846c724dd84142p1c08b7jsn1c2cb45b5fb6',
                        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                    }
                });

                
                const weatherData = resp.data as { current: { temp_c: number, condition: { text: string } } };

                results.push({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    weather: `${weatherData.current.condition.text}`
                });

                
                await Weather.create({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude.toString(),
                    longitude: locationData.longitude.toString(),
                    weather: `${weatherData.current.condition.text}`,
                    createdAt: new Date(),
                });
                
                
            } else {
                console.log(`No data found for city: ${cityObj.city}`);
            }
        } catch (error) {
            console.log(`Error fetching data for city: ${cityObj.city}`, error);
        }
    }

    res.send(results);
   console.log(results);
};
export const getWeatherDashboard = async (req: Request, res: Response) => {
    const { city } = req.query;

    try {
        let weatherData;

        if (city) {
            weatherData = await Weather.findAll({
                where: {
                    city: {
                        [Op.iLike]: `%${city}%`
                    }
                },
                order: [['createdAt', 'DESC']]
            });
        } else {
            weatherData = await Weather.findAll({
                attributes: [
                    'id',
                    'city',
                    'country',
                    'weather',
                    [sequelize.fn('MAX', sequelize.col('createdAt')), 'date']
                ],
                group: ['id', 'city', 'country', 'weather'],
                order: [[sequelize.fn('MAX', sequelize.col('createdAt')), 'DESC']]
            });
        }

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
