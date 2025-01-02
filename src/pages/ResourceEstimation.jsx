import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { fetchGeminiResponse } from "../utils/api";
import {
  FaLeaf,
  FaWater,
  FaTools,
  FaUsers,
  FaChartLine,
  FaVolumeUp,
  FaStop,
} from "react-icons/fa";

const ResourceEstimation = () => {
  const cropOptions = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "corn", label: "Corn" },
    { value: "cotton", label: "Cotton" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "potato", label: "Potato" },
  ];

  const soilTypes = [
    { value: "loamy", label: "Loamy" },
    { value: "sandy", label: "Sandy" },
    { value: "clay", label: "Clay" },
    { value: "silt", label: "Silt" },
    { value: "peat", label: "Peat" },
  ];

  const seasons = [
    { value: "summer", label: "Summer" },
    { value: "winter", label: "Winter" },
    { value: "spring", label: "Spring" },
    { value: "autumn", label: "Autumn" },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
  ];

  const [formData, setFormData] = useState({
    cropType: cropOptions[0].value,
    landArea: "",
    soilType: soilTypes[0].value,
    season: seasons[0].value,
    language: languages[0].value,
  });

  const [estimationResult, setEstimationResult] = useState({
    resources: null,
    diseases: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("resources");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const convertToReadableText = (data, tab) => {
    if (tab === "resources" && data.resources) {
      const {
        seedQuantity,
        waterRequirement,
        laborEstimate,
        estimatedYield,
        costEstimate,
        profitPotential,
      } = data.resources;
      return `
        Here is your resource estimation:
        Seed Quantity needed is ${seedQuantity.amount} ${seedQuantity.unit}.
        Water Requirement is ${waterRequirement.amount} ${waterRequirement.unit} ${waterRequirement.frequency}.
        Labor estimate is ${laborEstimate.people} people for ${laborEstimate.days} days.
        Estimated yield is ${estimatedYield.amount} ${estimatedYield.unit}.
        Cost estimate: ${costEstimate}.
        Profit potential: ${profitPotential}.
      `;
    } else if (tab === "diseases" && data.diseases) {
      const { commonDiseases, generalPrecautions } = data.diseases;
      let text = "Here are the common diseases and precautions:\n";
      commonDiseases.forEach((disease) => {
        text += `${disease.name}. Symptoms include: ${disease.symptoms.join(
          ", "
        )}. `;
        text += `Preventive measures: ${disease.preventiveMeasures.join(
          ", "
        )}. `;
      });
      text += `General precautions: ${generalPrecautions.join(", ")}.`;
      return text;
    }
    return "";
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

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

    const resourcePrompt = `As an agricultural advisor, you are assisting a farmer in optimizing their crop planting strategy. You will receive inputs for the crop type, land area in square meters, soil quality, and the season (summer, spring, autumn, winter) in which the farmer plans to plant the crop. Please provide the response in ${formData.language}.

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

    Inputs provided: Crop Type: ${formData.cropType}, Land Area: ${formData.landArea} sq. meters, Soil Quality: ${formData.soilType}, Season: ${formData.season}

    Provide realistic estimates based on the given information. If the chosen crop is not optimal for the given season, include alternative crops in the 'alternativeCrops' array.`;

    const diseasePrompt = `As an agricultural advisor, you are assisting a farmer in protecting their crops from diseases. You will receive inputs for the crop type, land area in square meters, soil quality, and the season (summer, spring, autumn, winter) in which the farmer plans to plant the crop. Please provide the response in ${formData.language}.

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

    Inputs provided: Crop Type: ${formData.cropType}, Land Area: ${formData.landArea} sq. meters, Soil Quality: ${formData.soilType}, Season: ${formData.season}

    Provide information on the most common diseases for the given crop and conditions, along with general precautions for maintaining crop health.`;

    try {
      const [resourceResponse, diseaseResponse] = await Promise.all([
        fetchGeminiResponse(resourcePrompt),
        fetchGeminiResponse(diseasePrompt),
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

  const readAloud = () => {
    if (!window.speechSynthesis) {
      setError("Speech synthesis is not supported in your browser");
      return;
    }

    stopSpeaking();

    const text = convertToReadableText(estimationResult, activeTab);
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      formData.language === "english"
        ? "en-US"
        : formData.language === "hindi"
        ? "hi-IN"
        : formData.language === "spanish"
        ? "es-ES"
        : formData.language === "french"
        ? "fr-FR"
        : formData.language === "german"
        ? "de-DE"
        : "en-US";
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setError("Error occurred while speaking");
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const renderLanguageOptions = () => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="font-bold text-lg mb-2">Audio Options</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={isSpeaking ? stopSpeaking : readAloud}
          className={`flex items-center gap-2 p-2 ${
            isSpeaking
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white rounded-md transition-colors`}
          disabled={!estimationResult[activeTab]}>
          {isSpeaking ? (
            <>
              <FaStop /> Stop Reading
            </>
          ) : (
            <>
              <FaVolumeUp /> Read Aloud
            </>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );

  const renderResourceEstimation = () => {
    if (!estimationResult.resources) return null;
    const {
      seedQuantity,
      fertilizers,
      waterRequirement,
      tools,
      laborEstimate,
      estimatedYield,
      alternativeCrops,
      costEstimate,
      profitPotential,
      environmentalImpact,
      cropRotationSuggestions,
      marketDemand,
      pestControlMethods,
      harvestingTips,
      storageSuggestions,
    } = estimationResult.resources;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            icon={<FaLeaf className="text-green-500" />}
            title="Seed Quantity"
            content={`${seedQuantity.amount} ${seedQuantity.unit}`}
          />
          <ResourceCard
            icon={<FaWater className="text-blue-500" />}
            title="Water Requirement"
            content={`${waterRequirement.amount} ${waterRequirement.unit} ${waterRequirement.frequency}`}
          />
          <ResourceCard
            icon={<FaTools className="text-gray-500" />}
            title="Tools Needed"
            content={tools.join(", ")}
          />
          <ResourceCard
            icon={<FaUsers className="text-indigo-500" />}
            title="Labor Estimate"
            content={`${laborEstimate.people} people for ${laborEstimate.days} days`}
          />
          <ResourceCard
            icon={<FaChartLine className="text-yellow-500" />}
            title="Estimated Yield"
            content={`${estimatedYield.amount} ${estimatedYield.unit}`}
          />
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
          <p>{alternativeCrops.join(", ")}</p>
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
          <p>{cropRotationSuggestions.join(", ")}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Market Demand</h3>
          <p>{marketDemand}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Pest Control Methods</h3>
          <p>{pestControlMethods.join(", ")}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Harvesting Tips</h3>
          <p>{harvestingTips.join(", ")}</p>
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
              <p>
                <strong>Symptoms:</strong> {disease.symptoms.join(", ")}
              </p>
              <p>
                <strong>Preventive Measures:</strong>{" "}
                {disease.preventiveMeasures.join(", ")}
              </p>
              <p>
                <strong>Treatments:</strong> {disease.treatments.join(", ")}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">General Precautions</h3>
          <p>{generalPrecautions.join(", ")}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Resource Estimation</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Crop Type</label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md">
                {cropOptions.map((crop) => (
                  <option key={crop.value} value={crop.value}>
                    {crop.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Land Area (sq. meters)</label>
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleInputChange}
                placeholder="Enter land area"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Soil Type</label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md">
                {soilTypes.map((soil) => (
                  <option key={soil.value} value={soil.value}>
                    {soil.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Season</label>
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md">
                {seasons.map((season) => (
                  <option key={season.value} value={season.value}>
                    {season.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md">
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            {loading ? "Fetching..." : "Get Resource Estimation"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        {(estimationResult.resources || estimationResult.diseases) && (
          <>
            {renderLanguageOptions()}
            <div className="mb-6">
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
              <div className="mt-4">
                {activeTab === "resources" && renderResourceEstimation()}
                {activeTab === "diseases" && renderDiseaseInformation()}
              </div>
            </div>
          </>
        )}
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
