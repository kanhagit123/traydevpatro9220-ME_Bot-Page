import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "botai_conversations_v1";

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  function startNewChat() {
    const newConv = {
      id: uuid(),
      title: "New Conversation",
      messages: [],
      saved: false,
      feedback: {
        rating: 0,
        comment: ""
      },
      createdAt: Date.now()
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveId(newConv.id);
  }

  function updateConversation(id, patch) {
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, ...patch } : c))
    );
  }

  function appendMessage(id, message) {
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, messages: [...c.messages, message] } : c))
    );
  }

  function saveConversation(id) {
    updateConversation(id, { saved: true });
  }

  const activeConversation = conversations.find(c => c.id === activeId);

  return (
    <div className="page chat-page">
      <aside className="sidebar">
        <button className="new-chat" onClick={startNewChat}>New Chat</button>
        <h4>Conversations</h4>
        <div className="conv-list">
          {conversations.length === 0 && (
            <div className="empty-note">No conversations yet. Click "New Chat" to start.</div>
          )}
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`conv-item ${conv.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(conv.id)}
            >
              <div className="conv-title">{conv.title}</div>
              <div className="conv-meta">{conv.messages.length} messages</div>
            </div>
          ))}
        </div>
      </aside>

      <section className="chat-area">
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            onAppend={(msg) => appendMessage(activeConversation.id, msg)}
            onSave={() => saveConversation(activeConversation.id)}
            onUpdate={(patch) => updateConversation(activeConversation.id, patch)}
          />
        ) : (
          <div className="no-active">Start a new conversation to chat with the bot.</div>
        )}
      </section>
    </div>
  );
}
