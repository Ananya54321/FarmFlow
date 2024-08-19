import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="mt-6">
    <div className="flex space-x-4">
      <button
        onClick={() => setActiveTab('resources')}
        className={`p-2 ${activeTab === 'resources' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Resources
      </button>
      <button
        onClick={() => setActiveTab('diseases')}
        className={`p-2 ${activeTab === 'diseases' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Diseases
      </button>
    </div>
  </div>
);

export default Tabs;
