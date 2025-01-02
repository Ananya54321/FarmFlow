import React from "react";

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
