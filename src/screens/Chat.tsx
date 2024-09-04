import { ChatProvider } from "@/contexts/ChatContext";
import { useSettings } from "@/contexts/SettingsContext";
import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/Chat";
import { SettingsSidebar } from "@/components/Settings";

const Chat = () => {
  const { isSettingsOpen } = useSettings();

  return (
    <ChatProvider>
      <div className="flex h-screen">
        <Sidebar />
        <ChatContainer />
        {isSettingsOpen && <SettingsSidebar />}
      </div>
    </ChatProvider>
  );
};

export default Chat;
