import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="app-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h1 style={{ fontSize: "1.8rem", margin: 0 }}>Bot AI</h1>
        <span style={{ fontSize: "1rem", color: "#555" }}>Soul AI</span>
      </div>

      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Chat</Link>
        <Link to="/history">History</Link>
        <Link to="/feedback">Feedback</Link>
        <a href="/">New Chat</a>
      </nav>
    </header>
  );
}
