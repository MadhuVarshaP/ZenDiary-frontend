import React, { useEffect, useState } from 'react';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        err => {
          setError("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchWeatherData = (lat, lon) => {
    const apiKey = '3242ae783effb92acd8665c5284c7740'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.weather && data.weather.length > 0) {
          setWeatherData(data);
        } else {
          setError("Weather data is unavailable.");
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-black mb-4">Current Weather</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        weatherData && weatherData.weather && weatherData.weather.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="text-center">
              <h3 className="text-2xl font-semibold">{weatherData.name}</h3>
              <p className="text-lg">{weatherData.weather[0]?.description}</p>
              <p className="text-xl font-bold">{weatherData.main.temp}°C</p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0]?.description}
              className="w-[80px] h-[80px]"
            />
          </div>
        )
      )}
    </div>
  );
};

export default WeatherForecast;
