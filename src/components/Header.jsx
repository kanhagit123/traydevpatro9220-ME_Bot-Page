import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
     
      <span>Soul AI</span>
      <nav>
        <Link to="/">Chat</Link>
        <Link to="/history">History</Link>
        <Link to="/feedback">Feedback</Link>
       
        <a href="/">New Chat</a>
      </nav>
    </header>
  );
}
