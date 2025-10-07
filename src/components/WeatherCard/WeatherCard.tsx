import React from "react";
import { WeatherData } from "../../types/weather.types";
import "./WeatherCard.css";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2 className="city-name">
        {weather.name}, {weather.sys.country}
      </h2>

      <div className="weather-icon">
        <img src={iconUrl} alt={weather.weather[0].description} />
      </div>

      <div className="temperature">{Math.round(weather.main.temp)}°C</div>

      <div className="description">{weather.weather[0].description}</div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Feels like:</span>
          <span className="value">{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="detail">
          <span className="label">Humidity:</span>
          <span className="value">{weather.main.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind:</span>
          <span className="value">{weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
