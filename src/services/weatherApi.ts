import { WeatherData } from '../types/models/weather.interface';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};