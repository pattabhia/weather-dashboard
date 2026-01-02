import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { getCurrentWeather } from "./services/weatherApi";
import { WeatherData } from "./types/models/weather.interface";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch weather for a default city on load
    fetchWeather("Nellore");
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

  return (
    <div className="App">
      <h1>Weather App</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
