import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Simulated weather data fetch
    const fetchWeatherData = () => {
      const simulatedData = {
        temperature: [
          { day: 'Mon', temp: 25 },
          { day: 'Tue', temp: 27 },
          { day: 'Wed', temp: 26 },
          { day: 'Thu', temp: 28 },
          { day: 'Fri', temp: 29 },
          { day: 'Sat', temp: 27 },
          { day: 'Sun', temp: 26 },
        ],
        rainfall: [
          { day: 'Mon', mm: 0 },
          { day: 'Tue', mm: 5 },
          { day: 'Wed', mm: 10 },
          { day: 'Thu', mm: 2 },
          { day: 'Fri', mm: 0 },
          { day: 'Sat', mm: 0 },
          { day: 'Sun', mm: 3 },
        ],
        humidity: 65,
      };
      setWeatherData(simulatedData);
    };

    fetchWeatherData();
  }, []);

  const getWeatherInsights = () => {
    if (!weatherData) return '';

    const avgTemp = weatherData.temperature.reduce((sum, day) => sum + day.temp, 0) / 7;
    const totalRainfall = weatherData.rainfall.reduce((sum, day) => sum + day.mm, 0);

    return `
      The average temperature for the week is ${avgTemp.toFixed(1)}°C.
      Total expected rainfall is ${totalRainfall}mm.
      The humidity is around ${weatherData.humidity}%.
      
      Insights:
      - The temperature is suitable for most crops. Keep an eye on water needs.
      - Rainfall is moderate. Prepare for some wet days, but additional irrigation may be needed.
      - Humidity levels are moderate. Watch for potential fungal diseases in susceptible crops.
    `;
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Weather Forecast</h1>
        {weatherData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Temperature Forecast</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weatherData.temperature}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Rainfall Forecast</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weatherData.rainfall}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mm" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Weather Insights</h2>
              <pre className="whitespace-pre-wrap">{getWeatherInsights()}</pre>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </main>
    </div>
  );
};

export default WeatherForecast;