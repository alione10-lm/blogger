import React from "react";

const FormRow = ({ children, label, htmlFor = label }) => {
  return (
    <div
      role="row"
      className="mb-4 flex  w-full flex-col items-start justify-center"
    >
      <label className="text-gray-600 mb-2" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormRow;
