import React from "react";

const InfoSection = ({ title, content }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="font-bold text-xl mb-4">{title}</h3>
    <p>{content}</p>
  </div>
);

export default InfoSection;
