import React from 'react';
import DiseaseCard from './DiseaseCard';

const DiseaseInformationDetails = ({ diseases }) => (
  <div className="mt-6">
    <h2 className="text-xl font-bold">Disease Information</h2>
    <div className="mt-4">
      {diseases.commonDiseases.map((disease, index) => (
        <DiseaseCard
          key={index}
          name={disease.name}
          symptoms={disease.symptoms}
          preventiveMeasures={disease.preventiveMeasures}
          treatments={disease.treatments}
        />
      ))}
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">General Precautions</h3>
      <ul className="list-disc ml-5">
        {diseases.generalPrecautions.map((precaution, index) => (
          <li key={index}>{precaution}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default DiseaseInformationDetails;
