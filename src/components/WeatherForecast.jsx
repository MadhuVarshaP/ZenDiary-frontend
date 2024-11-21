import React, { useEffect, useState } from 'react';
import { TiWeatherPartlySunny } from "react-icons/ti";

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
    <div className="bg-blue p-6 rounded-lg shadow-xl text-white">
  <h2 className="text-2xl font-semibold mb-4 text-black">Current Weather</h2>

  {loading ? (
    <p className="text-lg text-gray-200">Loading...</p>
  ) : error ? (
    <p className="text-red-400 text-lg">{error}</p>
  ) : (
    weatherData && weatherData.weather && weatherData.weather.length > 0 && (
      <div className="flex justify-between items-center space-x-4">
        <div className="text-center flex-1">
          <h3 className="text-3xl font-semibold">{weatherData.name}</h3>
          <p className="text-lg italic">{weatherData.weather[0]?.description}</p>
          <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
        </div>
        <TiWeatherPartlySunny className='w-[100px] h-[100px]'/>
      </div>
    )
  )}
</div>

  );
};

export default WeatherForecast;
