import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border border-gray-300 rounded-md"
    />
  </div>
);

export default FormInput;
