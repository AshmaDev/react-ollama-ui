import { X } from "@phosphor-icons/react";

interface AlertProps {
  text: string;
  onClose: () => void;
}

const Alert = ({ text, onClose }: AlertProps) => {
  return (
    <div className="relative rounded-xl m-4 p-4 text-red-500 border border-red-500">
      <span className="absolute top-4 right-4" onClick={onClose}>
        <X size={20} />
      </span>

      <p>{text}</p>
    </div>
  );
};

export default Alert;
