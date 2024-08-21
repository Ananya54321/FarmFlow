import React from 'react';
import { Link } from 'react-router-dom';

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.ibb.co/Y2Kc8Th/Untitled-design-4.png" alt="FarmSavy Logo" className="h-10 w-auto mr-4" />
            <h1 className="text-2xl font-bold text-green-600">FarmSavy</h1>
          </div>
          <nav>
            <Link to="/login" className="text-gray-600 hover:text-green-600 mx-4">Login</Link>
            <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-800">
          Smart Farming for a <span className="text-green-600">Brighter Future</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Empower your farm with cutting-edge technology and data-driven insights. FarmSavy helps you maximize yields, reduce costs, and cultivate sustainability.
        </p>
        <Link 
          to="/signup" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
        >
          Get Started Free
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose FarmSavy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon="🌱"
              title="Smart Crop Planning"
              description="Optimize your crop selection and rotation based on soil conditions, climate data, and market trends."
            />
            <Feature 
              icon="💧"
              title="Precision Irrigation"
              description="Save water and improve crop health with AI-powered irrigation recommendations."
            />
            <Feature 
              icon="📊"
              title="Yield Forecasting"
              description="Make informed decisions with accurate yield predictions powered by machine learning."
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Farmers Say</h2>
          <blockquote className="text-2xl italic mb-8">
            "FarmSavy has revolutionized the way I manage my farm. I've seen a 30% increase in yields and significant cost savings."
          </blockquote>
          <p className="font-semibold">- John Doe, Organic Farmer</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of farmers already using FarmSavy to grow smarter.</p>
          <Link 
            to="/signup" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
          >
            Let's Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">FarmSavy</h3>
              <p className="text-gray-400">Empowering farmers with smart solutions for a bountiful harvest</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <ul className="text-gray-400">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>&copy; 2024 FarmSavy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;