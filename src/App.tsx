import React from "react";
import { ChatProvider } from "./contexts/ChatContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import Chat from "./screens/Chat";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </SettingsProvider>
  );
};

export default App;
