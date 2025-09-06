import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      
      <h1><span>Soul AI</span></h1>
      <nav>
        <Link to="/">Chat</Link>
        <Link to="/history">History</Link>
        <Link to="/feedback">Feedback</Link>
      </nav>
    </header>
  );
}
