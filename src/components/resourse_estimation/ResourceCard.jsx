import React from 'react';

const ResourceCard = ({ title, value }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <pre className="mt-2">{JSON.stringify(value, null, 2)}</pre>
  </div>
);

export default ResourceCard;
