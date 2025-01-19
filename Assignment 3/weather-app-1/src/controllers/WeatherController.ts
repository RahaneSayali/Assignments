import { Request, Response } from 'express';
import { Weather } from '../models/Weather';
import { fetchCoordinates, fetchWeatherData } from '../services/WeatherService';import moment from 'moment';

export const saveWeatherMapping = async (req: Request, res: Response) => {
  const cities = req.body;

  try {
    // Ensure the table is created if it doesn't exist
    await Weather.sync();  // Ensure table is created if it doesn't exist

    const weatherData = [];

    for (const cityObj of cities) {
      const { city, country } = cityObj;

      console.log(`Fetching coordinates for ${city}, ${country}`);

      // Fetch coordinates
      let coordinates;
      try {
        coordinates = await fetchCoordinates(city, country);
        console.log('Coordinates:', coordinates); // Log coordinates to debug
      } catch (error) {
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
          weather = await fetchWeatherData(latitude, longitude);
          console.log(weather);
        } catch (error) {
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
          const newWeather = await Weather.create({
            city,
            country,
            weather: weather,  // Save the entire weather object as JSON
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            time: moment().format(),  // Current timestamp
          });

          weatherData.push(newWeather);
        } catch (dbError) {
          console.error(`Error saving weather data for ${city}, ${country}:`, dbError);
          continue; // Skip saving in case of DB errors
        }
      } else {
        console.error(`No coordinates found for ${city}, ${country}`);
        continue;
      }
    }

    // Return the saved weather data
    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching weather data.' });
  }
};

export const getWeatherDashboard = async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string; // Get the city query parameter if provided

    if (city) {
      // Fetch the latest weather data for the given city
      const weatherData = await Weather.findAll({
        where: { city: city },
        order: [['time', 'DESC']],  // Ensure we get the latest data
        limit: 1,  // Limit to the latest weather entry for this city
      });

      if (weatherData.length > 0) {
        return res.json(weatherData);
      } else {
        return res.status(404).json({ message: `No weather data found for city: ${city}` });
      }
    } else {
      // If no city is provided, fetch the latest weather for all cities
      const allWeatherData = await Weather.findAll({
        attributes: ['id', 'city', 'country', 'time', 'weather'], // Only include relevant fields
        order: [['time', 'DESC']],  // Order by latest data
      });

      // Group weather data by city and only return the latest data for each city
      const latestWeatherByCity: any[] = [];
      const citiesSeen = new Set();

      allWeatherData.forEach((data) => {
        if (!citiesSeen.has(data.city)) {
          latestWeatherByCity.push(data);
          citiesSeen.add(data.city);
        }
      });

    res.json(latestWeatherByCity);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }};