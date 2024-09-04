import { ReactNode } from "react";
import cn from "classnames";

interface ButtonProps {
  label?: string;
  block?: boolean;
  className?: string;
  onClick?: () => void;
  Icon?: ReactNode;
}

const Button = ({ label, block, className, onClick, Icon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-3 px-4 rounded-xl transition-colors duration-200 bg-white hover:bg-neutral-50 text-neutral-600",
        className,
        {
          "w-full": block,
        }
      )}
    >
      {Icon && <span className="text-xl">{Icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
