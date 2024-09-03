import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatContainer } from "./components/Chat";
import SettingsSidebar from "./components/SettingsSidebar";
import { generateChat } from "./services/api";
import { ChatMessage, ChatRequest } from "./types/api.types";

const DEFAULT_MODEL = "phi3";
const DEFAULT_API_URL = "http://localhost:11434/api";

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [debugMode, setDebugMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    const chatRequest: ChatRequest = {
      model,
      messages: [...messages, userMessage],
    };

    let botMessage: ChatMessage = { role: "bot", content: "" };
    setMessages((prev) => [...prev, botMessage]);

    try {
      await generateChat(chatRequest, (data) => {
        botMessage.content += data.message.content;
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = { ...botMessage };
          return updatedMessages;
        });
      });
    } catch (error) {
      console.error("Error generating chat:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSettingsClick={toggleSettings} />
      <ChatContainer messages={messages} onSendMessage={handleSendMessage} />
      {isSettingsOpen && (
        <SettingsSidebar
          onClose={toggleSettings}
          model={model}
          setModel={setModel}
          apiUrl={apiUrl}
          setApiUrl={setApiUrl}
          debugMode={debugMode}
          setDebugMode={setDebugMode}
        />
      )}
    </div>
  );
};

export default App;
