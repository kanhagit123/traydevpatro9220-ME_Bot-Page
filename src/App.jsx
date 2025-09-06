import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import Header from "./components/Header";

function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
