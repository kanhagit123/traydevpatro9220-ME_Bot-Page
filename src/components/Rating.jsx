import React, { useState } from "react";

export default function Rating({ initialRating = 0, initialComment = "", onSave }) {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  function save() {
    onSave(rating, comment);
  }

  return (
    <div className="rating-box">
      <div className="stars">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={`star ${n <= rating ? "filled" : ""}`}
            onClick={() => setRating(n)}
            aria-label={`Rate ${n}`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        placeholder="Any other feedback?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="rating-actions">
        <button type="button" onClick={save} className="save-feedback">Save Feedback</button>
      </div>
    </div>
  );
}
