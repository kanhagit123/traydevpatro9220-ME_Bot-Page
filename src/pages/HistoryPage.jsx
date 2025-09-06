import React, { useEffect, useState } from "react";

const STORAGE_KEY = "botai_conversations_v1";

export default function HistoryPage() {
  const [convs, setConvs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setConvs(JSON.parse(saved));
  }, []);

  return (
    <div className="page history-page">
      <h2>Past Conversions</h2>
      {convs.length === 0 && <div>No saved conversations.</div>}
      <div className="history-list">
        {convs.map(conv => (
          <div key={conv.id} className="history-card">
            <div className="hist-header">
              <strong>{conv.title}</strong>
              <div>{new Date(conv.createdAt).toLocaleString()}</div>
            </div>
            <div className="hist-body">
              {conv.messages.map((m, i) => (
                <div key={i} className={`hist-msg ${m.from}`}>
                  <span className="hist-speaker">{m.from === "ai" ? "Soul AI" : "You"}</span>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
            <div className="hist-feedback">
              <div>Rating: {conv.feedback?.rating || 0} / 5</div>
              <div>Comment: {conv.feedback?.comment || "-"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
