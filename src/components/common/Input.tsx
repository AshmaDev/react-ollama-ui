import cn from "classnames";

interface InputProps {
  value: string;
  type?: string;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const Input = ({
  value,
  type = "text",
  autoFocus,
  placeholder,
  className,
  onChange,
  onBlur,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={cn(
        "w-full rounded-xl p-2 border border-neutral-200 bg-neutral-50 outline-none focus:border-neutral-300",
        className
      )}
    />
  );
};

export default Input;
