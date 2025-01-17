import axios from 'axios';

const GEOCODING_API_URL = 'https://api.api-ninjas.com/v1/geocoding';
const WEATHER_API_URL = 'https://weatherapi-com.p.rapidapi.com/current.json';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const GEO_API_KEY = process.env.GEO_API_KEY;

interface GeocodingResult {
    latitude: string;
    longitude: string;
    city: string;
    country: string;
    
  }
  
// Fetch coordinates using GeoCoding API
export const fetchCoordinates = async (city: string, country: string) => {
  const response = await axios.get<GeocodingResult[]>(GEOCODING_API_URL, {
    params: { city, country },
    headers: { 'X-Api-Key': GEO_API_KEY },
  });

  if (response.data.length === 0) {
    throw new Error(`Coordinates not found for ${city}, ${country}`);
  }

  return response.data; // Return the first match
};

// Fetch weather data using the Weather API
export const fetchWeatherData = async (latitude: string, longitude:string) => {
    if (!latitude || !longitude) {
        throw new Error('Invalid coordinates');
      }
      const query=latitude+longitude;
  const response = await axios.get(`${WEATHER_API_URL}?q=${query}`, {
   
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
  });


  const weatherData = response.data as { current: {condition: { text: string } } };
  const result=weatherData.current.condition.text;
  console.log("result",result);

  return result;
};
