import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Calculator, Cloud, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Resource Estimation', path: '/resource-estimation', icon: Calculator },
    { name: 'Weather Forecast', path: '/weather-forecast', icon: Cloud },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-20 md:hidden bg-green-600 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-20 bg-green-800 text-white w-64 min-h-screen p-4 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <nav className="mt-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-4">
                <Link
                  to={item.path}
                  className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-green-700 text-white'
                      : 'hover:bg-green-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content wrapper */}
      <div className="md:ml-64 p-4">
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;