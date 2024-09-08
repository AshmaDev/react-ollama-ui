import { ChatProvider } from "@/contexts/ChatContext";
import { useUI } from "@/contexts/UIContext";
import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/Chat";
import { SettingsSidebar } from "@/components/Settings";

const Chat = () => {
  const { isSettingsOpen } = useUI();

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
