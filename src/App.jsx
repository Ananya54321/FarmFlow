import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/DashboardPage';
import ResourceEstimation from './pages/ResourceEstimation';
import WeatherForecast from './pages/WeatherForecast';
import Help from './pages/Help';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resource-estimation" element={<ResourceEstimation />} />
        <Route path="/weather-forecast" element={<WeatherForecast />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;