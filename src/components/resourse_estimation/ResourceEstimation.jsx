import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { fetchGeminiResponse } from '../../utils/api';
import ResourceForm from './ResourceForm';
import Tabs from './Tabs';
import ResourceEstimationDetails from './ResourceEstimationDetails';
import DiseaseInformationDetails from './DiseaseInformationDetails';

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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <ResourceForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === 'resources' && <ResourceEstimationDetails resources={estimationResult.resources} />}
        {activeTab === 'diseases' && <DiseaseInformationDetails diseases={estimationResult.diseases} />}
      </div>
    </div>
  );
};

export default ResourceEstimation;
