import React from "react";
import DiseaseCard from "./DiseaseCard";
import InfoSection from "./InfoSection";

const DiseaseInformationTab = ({ diseases }) => {
  if (!diseases) return null;
  const { commonDiseases, generalPrecautions } = diseases;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commonDiseases.map((disease, index) => (
          <DiseaseCard key={index} disease={disease} />
        ))}
      </div>
      <InfoSection
        title="General Precautions"
        content={generalPrecautions.join(", ")}
      />
    </div>
  );
};

export default DiseaseInformationTab;
