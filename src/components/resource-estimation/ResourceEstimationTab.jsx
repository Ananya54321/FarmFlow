import React from "react";

const ResourceEstimationTab = ({ resources }) => {
  if (!resources) return null;
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
  } = resources;

  return (
    <div className="space-y-6">
      <ResourceMetrics
        seedQuantity={seedQuantity}
        waterRequirement={waterRequirement}
        tools={tools}
        laborEstimate={laborEstimate}
        estimatedYield={estimatedYield}
      />
      <FertilizerSection fertilizers={fertilizers} />
      <InfoSection
        title="Alternative Crops"
        content={alternativeCrops.join(", ")}
      />
      <InfoSection title="Cost Estimate" content={costEstimate} />
      <InfoSection title="Profit Potential" content={profitPotential} />
      <InfoSection title="Environmental Impact" content={environmentalImpact} />
      <InfoSection
        title="Crop Rotation Suggestions"
        content={cropRotationSuggestions.join(", ")}
      />
      <InfoSection title="Market Demand" content={marketDemand} />
      <InfoSection
        title="Pest Control Methods"
        content={pestControlMethods.join(", ")}
      />
      <InfoSection
        title="Harvesting Tips"
        content={harvestingTips.join(", ")}
      />
      <InfoSection title="Storage Suggestions" content={storageSuggestions} />
    </div>
  );
};

export default ResourceEstimationTab;
