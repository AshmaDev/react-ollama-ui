import React from "react";
import cn from "classnames";

interface InputProps {
  type?: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  placeholder,
  className,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-xl p-2 border border-neutral-200 bg-neutral-50",
        className
      )}
    />
  );
};

export default Input;
