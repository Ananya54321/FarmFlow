import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { fetchGeminiResponse } from '../utils/api';
import { FaLeaf, FaWater, FaTools, FaUsers, FaChartLine } from 'react-icons/fa';

const ResourceEstimation = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    landArea: '',
    soilType: '',
    season: '',
  });
  const [estimationResult, setEstimationResult] = useState({
    resources: null,
    diseases: null,
  });
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resources');

  const cleanAndParseJSON = (response) => {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON object found in the response");
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      throw new Error("Invalid JSON response from API");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const resourcePrompt = `As an agricultural advisor, you are assisting a farmer in optimizing their crop planting strategy. You will receive inputs for the crop type, land area in square meters, soil quality, and the season (summer, spring, autumn, winter) in which the farmer plans to plant the crop. Your task is to provide resource estimation information.

    Please provide the following information in JSON format:
    {
      "seedQuantity": {
        "amount": number,
        "unit": string
      },
      "fertilizers": [
        {
          "name": string,
          "quantity": {
            "amount": number,
            "unit": string
          }
        }
      ],
      "waterRequirement": {
        "amount": number,
        "unit": string,
        "frequency": string
      },
      "tools": [string],
      "laborEstimate": {
        "people": number,
        "days": number
      },
      "estimatedYield": {
        "amount": number,
        "unit": string
      },
      "alternativeCrops": [string],
      "costEstimate": string,
      "profitPotential": string,
      "environmentalImpact": string,
      "cropRotationSuggestions": [string],
      "marketDemand": string,
      "pestControlMethods": [string],
      "harvestingTips": [string],
      "storageSuggestions": string
    }

    Inputs provided: Crop Type: ${formData.cropType}, Land Area: ${formData.landArea} sq. meters, Soil Quality: ${formData.soilType}, Season: ${formData.season}.

    Provide realistic estimates based on the given information. If the chosen crop is not optimal for the given season, include alternative crops in the 'alternativeCrops' array.`;

    const diseasePrompt = `As an agricultural advisor, you are assisting a farmer in protecting their crops from diseases. You will receive inputs for the crop type, land area in square meters, soil quality, and the season (summer, spring, autumn, winter) in which the farmer plans to plant the crop. Your task is to provide disease information.

    Please provide the following information in JSON format:
    {
      "commonDiseases": [
        {
          "name": string,
          "symptoms": [string],
          "preventiveMeasures": [string],
          "treatments": [string]
        }
      ],
      "generalPrecautions": [string]
    }

    Inputs provided: Crop Type: ${formData.cropType}, Land Area: ${formData.landArea} sq. meters, Soil Quality: ${formData.soilType}, Season: ${formData.season}.

    Provide information on the most common diseases for the given crop and conditions, along with general precautions for maintaining crop health.`;

    try {
      const [resourceResponse, diseaseResponse] = await Promise.all([
        fetchGeminiResponse(resourcePrompt),
        fetchGeminiResponse(diseasePrompt)
      ]);

      setEstimationResult({
        resources: cleanAndParseJSON(resourceResponse),
        diseases: cleanAndParseJSON(diseaseResponse),
      });
    } catch (err) {
      setError(`Failed to fetch estimation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const translateToLanguage = async (selectedLanguage) => {
    if (!estimationResult.resources && !estimationResult.diseases) return;

    setLoading(true);
    setError(null);
    const prompt = `Please translate the following JSON objects into ${selectedLanguage}. Maintain the JSON structure and only translate the string values:

    Resource Estimation:
    ${JSON.stringify(estimationResult.resources, null, 2)}

    Disease Information:
    ${JSON.stringify(estimationResult.diseases, null, 2)}`;

    try {
      const response = await fetchGeminiResponse(prompt);
      const translatedData = cleanAndParseJSON(response);
      setEstimationResult({
        resources: translatedData.resources,
        diseases: translatedData.diseases,
      });
      setLanguage(selectedLanguage);
    } catch (err) {
      setError('Failed to translate the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    translateToLanguage(e.target.value);
  };

  const readAloud = () => {
    alert('Reading aloud in the selected language (to be implemented)');
  };

  const renderResourceEstimation = () => {
    if (!estimationResult.resources) return null;
    const { seedQuantity, fertilizers, waterRequirement, tools, laborEstimate, estimatedYield, alternativeCrops, costEstimate, profitPotential, environmentalImpact, cropRotationSuggestions, marketDemand, pestControlMethods, harvestingTips, storageSuggestions } = estimationResult.resources;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard icon={<FaLeaf className="text-green-500" />} title="Seed Quantity" content={`${seedQuantity.amount} ${seedQuantity.unit}`} />
          <ResourceCard icon={<FaWater className="text-blue-500" />} title="Water Requirement" content={`${waterRequirement.amount} ${waterRequirement.unit} ${waterRequirement.frequency}`} />
          <ResourceCard icon={<FaTools className="text-gray-500" />} title="Tools Needed" content={tools.join(', ')} />
          <ResourceCard icon={<FaUsers className="text-indigo-500" />} title="Labor Estimate" content={`${laborEstimate.people} people for ${laborEstimate.days} days`} />
          <ResourceCard icon={<FaChartLine className="text-yellow-500" />} title="Estimated Yield" content={`${estimatedYield.amount} ${estimatedYield.unit}`} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Fertilizers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fertilizers.map((fertilizer, index) => (
              <div key={index} className="bg-green-100 p-4 rounded-md">
                <h4 className="font-semibold">{fertilizer.name}</h4>
                <p>{`${fertilizer.quantity.amount} ${fertilizer.quantity.unit}`}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Alternative Crops</h3>
          <p>{alternativeCrops.join(', ')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Cost Estimate</h3>
          <p>{costEstimate}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Profit Potential</h3>
          <p>{profitPotential}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Environmental Impact</h3>
          <p>{environmentalImpact}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Crop Rotation Suggestions</h3>
          <p>{cropRotationSuggestions.join(', ')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Market Demand</h3>
          <p>{marketDemand}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Pest Control Methods</h3>
          <p>{pestControlMethods.join(', ')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Harvesting Tips</h3>
          <p>{harvestingTips.join(', ')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Storage Suggestions</h3>
          <p>{storageSuggestions}</p>
        </div>
      </div>
    );
  };

  const renderDiseaseInformation = () => {
    if (!estimationResult.diseases) return null;
    const { commonDiseases, generalPrecautions } = estimationResult.diseases;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonDiseases.map((disease, index) => (
            <div key={index} className="bg-red-100 p-4 rounded-md">
              <h4 className="font-semibold">{disease.name}</h4>
              <p><strong>Symptoms:</strong> {disease.symptoms.join(', ')}</p>
              <p><strong>Preventive Measures:</strong> {disease.preventiveMeasures.join(', ')}</p>
              <p><strong>Treatments:</strong> {disease.treatments.join(', ')}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">General Precautions</h3>
          <p>{generalPrecautions.join(', ')}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Resource Estimation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="cropType" value={formData.cropType} onChange={handleInputChange} placeholder="Crop Type" className="p-2 border border-gray-300 rounded-md" />
            <input type="number" name="landArea" value={formData.landArea} onChange={handleInputChange} placeholder="Land Area (sq. meters)" className="p-2 border border-gray-300 rounded-md" />
            <input type="text" name="soilType" value={formData.soilType} onChange={handleInputChange} placeholder="Soil Type" className="p-2 border border-gray-300 rounded-md" />
            <input type="text" name="season" value={formData.season} onChange={handleInputChange} placeholder="Season" className="p-2 border border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">
            {loading ? 'Fetching...' : 'Get Resource Estimation'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="mt-6">
          <div className="flex space-x-4">
            <button onClick={() => setActiveTab('resources')} className={`p-2 ${activeTab === 'resources' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}>
              Resources
            </button>
            <button onClick={() => setActiveTab('diseases')} className={`p-2 ${activeTab === 'diseases' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}>
              Diseases
            </button>
          </div>
          {activeTab === 'resources' && renderResourceEstimation()}
          {activeTab === 'diseases' && renderDiseaseInformation()}
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ icon, title, content }) => (
  <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center space-x-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p>{content}</p>
    </div>
  </div>
);

export default ResourceEstimation;
