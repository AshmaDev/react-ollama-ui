import { Sidebar } from "../components/Sidebar";
import { ChatContainer } from "../components/Chat";
import SettingsSidebar from "../components/SettingsSidebar";
import { useSettings } from "../contexts/SettingsContext";

const Chat = () => {
  const { isSettingsOpen } = useSettings();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer />
      {isSettingsOpen && <SettingsSidebar />}
    </div>
  );
};

export default Chat;
