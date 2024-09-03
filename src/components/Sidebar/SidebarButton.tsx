interface SidebarButtonProps {
  label: string;
  onClick?: () => void;
}

const SidebarButton = ({ label, onClick }: SidebarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
    >
      {label}
    </button>
  );
};

export default SidebarButton;
