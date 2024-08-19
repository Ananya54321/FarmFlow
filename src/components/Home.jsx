import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Welcome to Farmer's Tool</h1>
      <img src="/farmer-image.jpg" alt="Farmer in field" className="w-64 h-64 object-cover rounded-full mb-8" />
      <div className="space-x-4">
        <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
        <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;