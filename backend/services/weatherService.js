const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Fetch weather data for a given city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
async function fetchWeather(city) {
  try {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured');
    }

    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;

    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      icon: data.weather[0].icon,
      main: data.weather[0].main
    };
  } catch (error) {
    if (error.response) {
      // API responded with error
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      } else if (error.response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API configuration.');
      } else {
        throw new Error(`Weather service error: ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Request made but no response
      throw new Error('Unable to reach weather service. Please try again later.');
    } else {
      // Other errors
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  }
}

module.exports = {
  fetchWeather
};

