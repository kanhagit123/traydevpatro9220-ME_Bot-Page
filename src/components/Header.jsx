import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="app-header">
      <h1>Bot AI</h1>
      <nav>
        <Link to="/">Chat</Link>
        <Link to="/history">History</Link>
        <Link to="/feedback">Feedback</Link>
        {/* New Chat button should be an <a> link */}
        <a href="/">New Chat</a>
      </nav>
    </header>
  );
}
