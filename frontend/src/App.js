import React, { useState, useEffect } from "react";
import './App.css';


function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Stockholm")
  const [loading, setLoading] = useState(false);

  const fetchWeather = () => {
    fetch(`/api/weather/${location}`)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching data", error));
  };
  useEffect(() => {
    fetchWeather();
  }, [location]);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': '☀️',
      'Partly cloudy': '⛅',
      'Cloudy': '☁️',
      'Overcast': '☁️',
      'Mist': '🌫️',
      'Patchy rain possible': '🌦️',
      'Rain': '🌧️',
      'Snow': '❄️'
    };
    return icons[condition] || '🌈';
  };

  const getBackgroundClass = (condition) => {
    const conditionClasses = {
      'Sunny': 'weather-sunny',
      'Partly cloudy': 'weather-partly-cloudy',
      'Cloudy': 'weather-cloudy',
      'Overcast': 'weather-overcast',
      'Rain': 'weather-rainy',
      'Snow': 'weather-snowy'
    };
    return conditionClasses[condition] || 'weather-default';
  };

  return (
    <div className={`app-container ${weather ? getBackgroundClass(weather?.current?.condition?.text) : 'weather-default'}`}>
      <div className="weather-card">
        <div className="search-container">
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ange stad"
            className="location-input"
          />
          <button 
            onClick={fetchWeather} 
            className="search-button"
          >
            Sök
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Laddar...</div>
        ) : weather && weather.location && weather.current ? (
          <div className="weather-details">
            <div className="weather-icon">
              {getWeatherIcon(weather.current.condition.text)}
            </div>
            <h2 className="location-name">
              {weather.location.name}, {weather.location.country}
            </h2>
            <div className="temperature">
              {weather.current.temp_c}°C
            </div>
            <div className="weather-condition">
              {weather.current.condition.text}
            </div>
            <div className="weather-stats">
              <div className="stat">
                <span className="stat-label">Vind</span>
                <span className="stat-value">{weather.current.wind_kph} km/h</span>
              </div>
              <div className="stat">
                <span className="stat-label">Luftfuktighet</span>
                <span className="stat-value">{weather.current.humidity}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Tryck</span>
                <span className="stat-value">{weather.current.pressure_mb} hPa</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">Kunde inte hämta väderdata</div>
        )}
      </div>
    </div>
    );
      }
    
export default App