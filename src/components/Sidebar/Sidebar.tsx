import SidebarButton from "./SidebarButton";
import ChatList from "./ChatList";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <SidebarButton label="New Chat" />
      </div>
      <ChatList />
      <div className="p-4 space-y-2">
        <SidebarButton label="Settings" />
        <SidebarButton label="Logout" />
      </div>
    </div>
  );
};

export default Sidebar;
