import { useState, useEffect } from "react";
import { KB } from "../data";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setMessages(savedHistory);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim().toLowerCase();

    // ✅ Loose keyword matching
    let response = "Sorry, Did not understand your query!";
    for (let key in KB) {
      if (query.includes(key)) {
        response = KB[key];
        break;
      }
    }

    const newMsg = { question: input, answer: response };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    const updatedHistory = [...history, newMsg];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));

    setInput("");
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

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>You:</strong> {m.question}
            {/* Cypress expects bot answers inside <p> */}
            <p>{m.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
