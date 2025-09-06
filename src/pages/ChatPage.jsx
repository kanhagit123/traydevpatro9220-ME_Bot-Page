import { useState, useEffect } from "react";
import { KB } from "../data";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  useEffect(() => {
    // Load saved history into messages when page loads
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setMessages(savedHistory);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // lowercase key matching
    const query = input.trim().toLowerCase();
    const response = KB[query] || "Sorry, Did not understand your query!";
    const newMsg = { question: input, answer: response };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    const updatedHistory = [...history, newMsg];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));

    setInput("");
  };

  const handleNewChat = () => {
    setMessages([]);
    setHistory([]);
    localStorage.removeItem("history");
  };

  return (
    <div className="chat-page">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* Cypress expects a span inside button */}
        <button type="submit">
          <span>Ask</span>
        </button>
      </form>

      <button type="button" onClick={handleNewChat}>
        New Chat
      </button>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>You:</strong> {m.question}
            <p>{m.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
