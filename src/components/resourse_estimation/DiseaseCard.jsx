import React from 'react';

const DiseaseCard = ({ name, symptoms, preventiveMeasures, treatments }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
    <h3 className="text-lg font-semibold">{name}</h3>
    <div className="mt-2">
      <p><strong>Symptoms:</strong></p>
      <ul className="list-disc ml-5">
        {symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>
    </div>
    <div className="mt-2">
      <p><strong>Preventive Measures:</strong></p>
      <ul className="list-disc ml-5">
        {preventiveMeasures.map((measure, index) => (
          <li key={index}>{measure}</li>
        ))}
      </ul>
    </div>
    <div className="mt-2">
      <p><strong>Treatments:</strong></p>
      <ul className="list-disc ml-5">
        {treatments.map((treatment, index) => (
          <li key={index}>{treatment}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default DiseaseCard;
