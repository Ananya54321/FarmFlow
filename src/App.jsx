import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Dashboard from "./pages/DashboardPage";
import ResourceEstimation from "./pages/ResourceEstimation";
import WeatherForecast from "./pages/WeatherForecast";
import Help from "./pages/Help";
import Weather from "./components/Weather";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather" element={<Weather />} />
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
