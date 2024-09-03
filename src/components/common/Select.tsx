import React from "react";

interface SelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  optionRenderer: (option: string) => React.ReactNode;
}

const Select = ({
  value,
  options,
  onChange,
  placeholder = "Select an option",
  optionRenderer,
}: SelectProps) => {
  return (
    <select
      className="w-full rounded-xl p-2 border border-neutral-200 bg-neutral-50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {optionRenderer(option)}
        </option>
      ))}
    </select>
  );
};

export default Select;
