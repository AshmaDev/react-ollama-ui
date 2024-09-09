interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-4 overflow-hidden rounded-full border border-neutral-200 bg-neutral-50">
      <div
        className="h-4 rounded-full bg-neutral-300 "
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
