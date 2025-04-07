import React from "react";

const Select = ({ options }) => {
  return (
    <select className="bg-slate-100/4 p-2 text-gray-600    rounded-lg">
      {options.map((option, ndx) => (
        <option key={ndx} className="" value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
