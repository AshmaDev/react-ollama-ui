import { ReactNode } from "react";
import cn from "classnames";

interface ButtonProps {
  label?: string;
  block?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  Icon?: ReactNode;
}

const Button = ({
  label,
  block,
  disabled,
  className,
  onClick,
  Icon,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 rounded-xl transition-colors duration-200 bg-white hover:bg-neutral-50 text-neutral-600",
        className,
        {
          "opacity-75": disabled,
          "w-full p-3": block,
          "py-2": !block,
        }
      )}
    >
      {Icon && <span className="text-xl">{Icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
