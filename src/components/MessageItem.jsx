import React, { useState } from "react";

export default function MessageItem({ message }) {
  // message: {from: 'user'|'ai', text, likes, dislikes}
  const [likes, setLikes] = useState(message.likes || 0);
  const [dislikes, setDislikes] = useState(message.dislikes || 0);
  const [hover, setHover] = useState(false);

  function onLike() {
    setLikes(l => l + 1);
  }
  function onDislike() {
    setDislikes(d => d + 1);
  }

  return (
    <div
      className={`message-item ${message.from === "ai" ? "ai-msg" : "user-msg"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {message.from === "ai" && <span className="speaker">Soul AI</span>}
      <p>{message.text}</p>

      {message.from === "ai" && (
        <div className={`feedback-floater ${hover ? "visible" : ""}`}>
          <button className="thumb" title="Like" onClick={onLike} aria-label="like">👍</button>
          <button className="thumb" title="Dislike" onClick={onDislike} aria-label="dislike">👎</button>
          <div className="counts">
            <span>{likes}</span>/<span>{dislikes}</span>
          </div>
        </div>
      )}
    </div>
  );
}
