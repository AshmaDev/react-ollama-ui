interface SidebarButtonProps {
  label: string;
}

const SidebarButton = ({ label }: SidebarButtonProps) => {
  return (
    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
      {label}
    </button>
  );
};

export default SidebarButton;
