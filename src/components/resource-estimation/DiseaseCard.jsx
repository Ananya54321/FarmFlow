import React from "react";

const DiseaseCard = ({ disease }) => (
  <div className="bg-red-100 p-4 rounded-md">
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
);

export default DiseaseCard;
