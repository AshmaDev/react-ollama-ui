import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import Chat from "./screens/Chat";

const App = () => {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
};

export default App;
