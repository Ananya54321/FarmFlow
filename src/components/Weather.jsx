import React, { useEffect, useState, useRef } from "react";
import searchIcon from "../assets/search.png";
import clear from "../assets/clear.png";
import humid from "../assets/humidity.png";
import wind from "../assets/wind.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import drizzle from "../assets/drizzle.png";

const Weather = () => {
  const inputRef = useRef();
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setError(null);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWeather("Hyderabad");
  }, []);

  const handleSearch = () => {
    if (inputRef.current.value.trim()) {
      fetchWeather(inputRef.current.value.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-8 ">
      <div className="searchbar flex items-center bg-white shadow-md rounded-lg p-2 w-full max-w-md mb-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city"
          className="flex-1 p-2 text-gray-700 outline-none rounded-l-lg"
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg"
          onClick={handleSearch}>
          <img src={searchIcon} alt="Search" className="h-5 w-5" />
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div className="bg-white shadow-md rounded-lg p-5 max-w-md w-full">
          <div className="flex items-center justify-center mb-5">
            <img
              src={weatherData.icon}
              alt="Weather Icon"
              className="h-20 w-20"
            />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-lg text-gray-700">{weatherData.location}</p>
          </div>
          <div className="flex justify-around mt-5">
            <div className="flex items-center">
              <img src={humid} alt="Humidity" className="h-6 w-6 mr-2" />
              <div>
                <p className="font-bold">{weatherData.humidity}%</p>
                <span className="text-sm text-gray-500">Humidity</span>
              </div>
            </div>
            <div className="flex items-center">
              <img src={wind} alt="Wind Speed" className="h-6 w-6 mr-2" />
              <div>
                <p className="font-bold">{weatherData.windSpeed} Km/h</p>
                <span className="text-sm text-gray-500">Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
