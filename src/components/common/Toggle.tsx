import { useState, useRef } from "react";
import cn from "classnames";

interface ToggleProps {
  title?: string;
  subtitle?: string;
  initialValue?: boolean;
  size?: "md" | "lg";
  onChange: (value: boolean) => void;
}

const Toggle = ({
  size = "md",
  title,
  subtitle,
  initialValue = false,
  onChange,
}: ToggleProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(initialValue);

  const handleToggleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  const handleClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  return (
    <div className="flex justify-between items-center">
      {title && (
        <div className="mr-4">
          <div className="font-bold text-neutral-600">
            {title}
          </div>

          {subtitle && (
            <div className="text-neutral-400">{subtitle}</div>
          )}
        </div>
      )}

      <div className="relative" onClick={handleClick}>
        <input
          ref={checkboxRef}
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={handleToggleChange}
        />

        <div
          className={cn(
            "rounded-full flex items-center cursor-pointer transition-colors duration-300 border",
            {
              "w-12 h-6 p-1": size === "md",
              "w-20 h-10 p-1": size === "lg",
              "bg-neutral-600 border-neutral-600": isChecked,
              "bg-neutral-50 border-neutral-200": !isChecked,
            }
          )}
        >
          <div
            className={cn(
              "rounded-full transform transition-transform duration-300 border border-neutral-200 bg-white",
              {
                "w-5 h-5": size === "md",
                "w-8 h-8": size === "lg",
                "translate-x-full": isChecked,
              }
            )}
            style={{
              transform: isChecked ? "translateX(100%)" : "translateX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toggle;
