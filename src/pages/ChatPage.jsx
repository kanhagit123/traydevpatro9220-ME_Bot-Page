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

    const query = input.trim().toLowerCase();
    const response =
      KB[query] ||
      "Sorry, Did not understand your query!";
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
        <button type="submit">
          <span>Ask</span>
        </button>
      </form>

      {/* Cypress test needs a button[type=button] */}
      <button type="button" onClick={handleNewChat}>
        Clear Chat
      </button>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>You:</strong> {m.question}
            {/* Cypress test explicitly looks for <p> */}
            <p>{m.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
