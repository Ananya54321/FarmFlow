import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceEstimationDetails = ({ resources }) => (
  <div className="mt-6">
    <h2 className="text-xl font-bold">Resource Estimation Details</h2>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <ResourceCard title="Seed Quantity" value={resources.seedQuantity} />
      <ResourceCard title="Fertilizers" value={resources.fertilizers} />
      <ResourceCard title="Water Requirement" value={resources.waterRequirement} />
      <ResourceCard title="Tools" value={resources.tools} />
      <ResourceCard title="Labor Estimate" value={resources.laborEstimate} />
      <ResourceCard title="Estimated Yield" value={resources.estimatedYield} />
      <ResourceCard title="Alternative Crops" value={resources.alternativeCrops} />
      <ResourceCard title="Cost Estimate" value={resources.costEstimate} />
      <ResourceCard title="Profit Potential" value={resources.profitPotential} />
      <ResourceCard title="Environmental Impact" value={resources.environmentalImpact} />
      <ResourceCard title="Crop Rotation Suggestions" value={resources.cropRotationSuggestions} />
      <ResourceCard title="Market Demand" value={resources.marketDemand} />
      <ResourceCard title="Pest Control Methods" value={resources.pestControlMethods} />
      <ResourceCard title="Harvesting Tips" value={resources.harvestingTips} />
      <ResourceCard title="Storage Suggestions" value={resources.storageSuggestions} />
    </div>
  </div>
);

export default ResourceEstimationDetails;
