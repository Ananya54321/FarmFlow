import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const FormSection = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  error,
  cropOptions,
  soilTypes,
  seasons,
  languages,
}) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h1 className="text-2xl font-bold mb-4">Resource Estimation</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormSelect
        label="Crop Type"
        name="cropType"
        value={formData.cropType}
        onChange={handleInputChange}
        options={cropOptions}
      />
      <FormInput
        label="Land Area (sq. meters)"
        name="landArea"
        value={formData.landArea}
        onChange={handleInputChange}
        type="number"
        placeholder="Enter land area"
      />
      <FormSelect
        label="Soil Type"
        name="soilType"
        value={formData.soilType}
        onChange={handleInputChange}
        options={soilTypes}
      />
      <FormSelect
        label="Season"
        name="season"
        value={formData.season}
        onChange={handleInputChange}
        options={seasons}
      />
      <FormSelect
        label="Language"
        name="language"
        value={formData.language}
        onChange={handleInputChange}
        options={languages}
      />
    </div>
    <button
      type="submit"
      className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
      {loading ? "Fetching..." : "Get Resource Estimation"}
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </form>
);

export default FormSection;
