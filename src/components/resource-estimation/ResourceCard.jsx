import React from "react";

const ResourceCard = ({ icon, title, content }) => (
  <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center space-x-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p>{content}</p>
    </div>
  </div>
);

export default ResourceCard;
