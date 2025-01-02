import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-200">
    <button
      onClick={() => setActiveTab("resources")}
      className={`py-2 px-4 font-medium text-sm focus:outline-none ${
        activeTab === "resources"
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}>
      Resources
    </button>
    <button
      onClick={() => setActiveTab("diseases")}
      className={`py-2 px-4 font-medium text-sm focus:outline-none ${
        activeTab === "diseases"
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}>
      Diseases
    </button>
  </div>
);

export default TabNavigation;
