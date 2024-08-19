import React from 'react';

const ResourceForm = ({ formData, handleInputChange, handleSubmit, loading, error }) => (
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Resource Estimation</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="cropType"
        value={formData.cropType}
        onChange={handleInputChange}
        placeholder="Crop Type"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        name="landArea"
        value={formData.landArea}
        onChange={handleInputChange}
        placeholder="Land Area (sq. meters)"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="soilType"
        value={formData.soilType}
        onChange={handleInputChange}
        placeholder="Soil Type"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="season"
        value={formData.season}
        onChange={handleInputChange}
        placeholder="Season"
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
    <button
      type="submit"
      className="mt-4 p-2 bg-blue-500 text-white rounded-md"
    >
      {loading ? 'Fetching...' : 'Get Resource Estimation'}
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </form>
);

export default ResourceForm;
