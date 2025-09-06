import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { KB } from "../data";
import Rating from "./Rating";

export default function ChatWindow({ conversation, onAppend, onSave, onUpdate }) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    // scroll on new messages
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  function getAIResponse(question) {
    if (!question) return "";
    const q = question.trim().toLowerCase();
    // simple KB lookup
    if (KB[q]) return KB[q];
    return "Sorry, Did not understand your query!";
  }

  const onSubmit = (e) => {
    e.preventDefault(); // ask button must be type=submit (form handling)
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), from: "user", text: input };
    onAppend(userMsg);
    setTyping(true);

    // mimic AI thinking
    setTimeout(() => {
      const aiText = getAIResponse(input);
      const aiMsg = { id: Date.now() + 1, from: "ai", text: aiText, likes: 0, dislikes: 0 };
      onAppend(aiMsg);
      setTyping(false);
      setInput("");
    }, 400);
  };

  const handleSave = () => {
    // Save conversation: allow user to provide title when saving
    const title = prompt("Enter title for this conversation", conversation.title || "My Conversation");
    onUpdate({ title: title || conversation.title, saved: true });
    onSave();
    alert("Conversation saved.");
  };

  const handleFeedbackSave = (rating, comment) => {
    onUpdate({ feedback: { rating, comment } });
    alert("Feedback saved.");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-title">{conversation.title}</div>
        <div className="chat-actions">
          <button type="button" onClick={handleSave} className="save-btn">Save</button>
        </div>
      </div>

      <div className="messages" ref={messagesRef}>
        {conversation.messages.map(msg => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        {typing && (
          <div className="typing">
            <span className="soul"> <span>Soul AI</span> </span>
            <p>Typing...</p>
          </div>
        )}
      </div>

      <form className="chat-input-frm" onSubmit={onSubmit}>
        <input
          placeholder="Message Bot AI…"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          data-testid="chat-input"
        />
        <button type="submit">Ask</button>
      </form>

      <div className="end-feedback">
        <h4>End of Conversation Feedback</h4>
        <Rating
          initialRating={conversation.feedback?.rating || 0}
          initialComment={conversation.feedback?.comment || ""}
          onSave={handleFeedbackSave}
        />
      </div>
    </div>
  );
}
