import { ChatProvider } from "@/contexts/ChatContext";
import { useUI } from "@/contexts/UIContext";
import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/Chat";
import { SettingsSidebar } from "@/components/Settings";
import PullModel from "@/components/Settings/PullModel";

const Chat = () => {
  const { isSettingsOpen } = useUI();

  return (
    <ChatProvider>
      <div className="flex h-screen">
        <Sidebar />
        <ChatContainer />
        {isSettingsOpen && <SettingsSidebar />}
      </div>

      <PullModel />
    </ChatProvider>
  );
};

export default Chat;
