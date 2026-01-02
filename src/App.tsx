import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import SearchBar from "./components/SearchBar/SearchBar";
import { getCurrentWeather } from "./services/weatherApi";
import { WeatherData } from "./types/models/weather.interface";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch weather for a default city on load
    fetchWeather("Delhi");
  }, []);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    fetchWeather(city);
  };

  return (
    <div className="App">
      <h1>🌤️ Weather Dashboard</h1>
      <p className="subtitle">Get real-time weather information for any city</p>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && <p className="loading-text">Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
