import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const loc = useLocation();
  return (
    <header className="app-header">
      <div className="brand">
        <span className="logo">Soul AI</span>
      </div>
      <nav>
        <Link to="/" className={loc.pathname === "/" ? "active" : ""}>Chat with Bot</Link>
        <Link to="/history" className={loc.pathname === "/history" ? "active" : ""}>Past Conversions</Link>
        <Link to="/feedback" className={loc.pathname === "/feedback" ? "active" : ""}>Feedback</Link>
      </nav>
    </header>
  );
}
