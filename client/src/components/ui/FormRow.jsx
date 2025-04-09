import React from "react";
import Error from "./Error";

const FormRow = ({ children, label, htmlFor = label, error }) => {
  return (
    <div role="row" className="mb-4 flex  w-full flex-col items-start ">
      <label
        className="text-gray-600 block text-sm/6 font-medium  dark:text-gray-300 mb-2"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      <div className="mt-1">{error && <Error>{error}</Error>}</div>
    </div>
  );
};

export default FormRow;
