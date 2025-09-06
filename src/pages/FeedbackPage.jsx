import React, { useEffect, useState } from "react";

const STORAGE_KEY = "botai_conversations_v1";

export default function FeedbackPage() {
  const [convs, setConvs] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setConvs(JSON.parse(saved));
  }, []);

  const allFeedbacks = convs
    .filter(c => c.feedback && (filter === 0 || c.feedback.rating === filter))
    .map(c => ({
      id: c.id,
      title: c.title,
      rating: c.feedback.rating,
      comment: c.feedback.comment,
      createdAt: c.createdAt
    }));

  return (
    <div className="page feedback-page">
      <h2>All Feedback</h2>
      <div className="filter-row">
        <label>Filter by rating:</label>
        <select value={filter} onChange={(e) => setFilter(Number(e.target.value))}>
          <option value={0}>All</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div className="feedback-list">
        {allFeedbacks.length === 0 && <div>No feedbacks yet.</div>}
        {allFeedbacks.map(f => (
          <div className="feedback-card" key={f.id}>
            <div><strong>{f.title}</strong> — {new Date(f.createdAt).toLocaleString()}</div>
            <div>Rating: {f.rating} / 5</div>
            <div>Comment: {f.comment || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
