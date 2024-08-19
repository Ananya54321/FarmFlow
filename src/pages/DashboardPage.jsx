import React from 'react';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const nitrogenData = [
    { month: 'Jan', level: 20 },
    { month: 'Feb', level: 25 },
    { month: 'Mar', level: 30 },
    { month: 'Apr', level: 35 },
    { month: 'May', level: 40 },
    { month: 'Jun', level: 45 },
  ];

  const popularCrops = [
    { name: 'Wheat', popularity: 80 },
    { name: 'Rice', popularity: 70 },
    { name: 'Corn', popularity: 60 },
    { name: 'Soybeans', popularity: 50 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Soil Nitrogen Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={nitrogenData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="level" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Popular Crops This Season</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={popularCrops}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="popularity" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Farming Tips</h2>
          <ul className="list-disc pl-6">
            <li>Rotate your crops to maintain soil health and prevent pest buildup.</li>
            <li>Implement proper irrigation techniques to conserve water.</li>
            <li>Use organic fertilizers when possible to improve soil structure.</li>
            <li>Monitor weather forecasts regularly to plan your farming activities.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;