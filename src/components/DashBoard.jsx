import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFarmingTips = (soilData) => {
    if (!soilData) return [];

    const tips = [];

    if (soilData.t10 < 10) {
      tips.push(
        "Soil temperature is low. Consider using mulch to warm the soil."
      );
    }

    if (soilData.moisture < 0.2) {
      tips.push("Soil moisture is low. Increase irrigation frequency.");
    } else if (soilData.moisture > 0.8) {
      tips.push(
        "Soil moisture is high. Reduce irrigation to prevent waterlogging."
      );
    }

    if (soilData.t0 > 30) {
      tips.push(
        "Surface temperature is high. Use shade cloths to protect sensitive crops."
      );
    }

    return tips;
  };

  return (
    <div className="flex">
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        {loading ? (
          <p>Loading soil data...</p>
        ) : error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Soil Information</h2>
                {soilData ? (
                  <ul>
                    <li>Surface Temperature: {soilData.t0}°C</li>
                    <li>10cm Depth Temperature: {soilData.t10}°C</li>
                    <li>Moisture: {soilData.moisture}</li>
                  </ul>
                ) : (
                  <p>No soil data available.</p>
                )}
              </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Farming Tips</h2>
              <ul className="list-disc pl-6">
                {getFarmingTips(soilData).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
                <li>
                  Rotate your crops to maintain soil health and prevent pest
                  buildup.
                </li>
                <li>
                  Use organic fertilizers when possible to improve soil
                  structure.
                </li>
                <li>
                  Monitor weather forecasts regularly to plan your farming
                  activities.
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
