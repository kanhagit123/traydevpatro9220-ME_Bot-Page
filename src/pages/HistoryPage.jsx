import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="history-page">
      <h2>Past Conversations</h2>
      <div className="history-list">
        {history.length === 0 ? (
          <p>No past conversations yet.</p>
        ) : (
          history.map((h, i) => (
            <div className="history-card" key={i}>
              <div>{h.question}</div>
              <div>{h.answer}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
