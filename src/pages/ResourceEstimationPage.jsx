import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FormSection from "../components/resource-estimation/FormSection";
import AudioControls from "../components/resource-estimation/AudioControls";
import TabNavigation from "../components/resource-estimation/TabNavigation";
import ResourceEstimationTab from "../components/resource-estimation/ResourceEstimationTab";
import DiseaseInformationTab from "../components/resource-estimation/DiseaseInformationTab";
import { fetchGeminiResponse } from "../utils/api";

const ResourceEstimation = () => {
  // Constants for form options
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

  // State declarations
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

  // Utility functions
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

    Inputs provided: Crop Type: ${formData.cropType}, Land Area: ${formData.landArea} sq. meters, Soil Quality: ${formData.soilType}, Season: ${formData.season}`;

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

    Inputs provided: Crop Type: ${formData.cropType}, Land Area: ${formData.landArea} sq. meters, Soil Quality: ${formData.soilType}, Season: ${formData.season}`;

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

  // Cleanup effect for speech synthesis
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <FormSection
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
          cropOptions={cropOptions}
          soilTypes={soilTypes}
          seasons={seasons}
          languages={languages}
        />

        {(estimationResult.resources || estimationResult.diseases) && (
          <>
            <AudioControls
              isSpeaking={isSpeaking}
              readAloud={readAloud}
              stopSpeaking={stopSpeaking}
              error={error}
              estimationResult={estimationResult}
              activeTab={activeTab}
            />
            <div className="mb-6">
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <div className="mt-4">
                {activeTab === "resources" && (
                  <ResourceEstimationTab
                    resources={estimationResult.resources}
                  />
                )}
                {activeTab === "diseases" && (
                  <DiseaseInformationTab diseases={estimationResult.diseases} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceEstimation;
