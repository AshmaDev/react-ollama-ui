import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useState } from "react";

interface PullFormProps {
  onPull: (modelName: string) => void;
}

const PullForm = ({ onPull }: PullFormProps) => {
  const [modelName, setModelName] = useState<string>("");

  const handlePull = () => onPull(modelName);

  return (
    <div className="flex items-center gap-4 mb-4">
      <Input placeholder="Model" value={modelName} onChange={setModelName} />

      <Button
        label="Pull"
        className="border border-neutral-200"
        onClick={handlePull}
      />
    </div>
  );
};

export default PullForm;
