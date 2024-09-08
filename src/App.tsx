import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import { UIProvider } from "./contexts/UIContext";
import Chat from "./screens/Chat";

const App = () => {
  return (
    <UIProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </UIProvider>
  );
};

export default App;
