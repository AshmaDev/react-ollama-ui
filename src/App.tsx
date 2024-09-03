import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatContainer from "./components/Chat/ChatContainer";

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default App;
