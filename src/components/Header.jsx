import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="app-header">
      <h1>
        <span>Soul AI</span>
      </h1>
      <nav>
        <Link to="/">Chat</Link>
        <Link to="/history">Past Conversations</Link>
        <Link to="/feedback">Feedback</Link>
        <button type="button">New Chat</button>
      </nav>
    </header>
  );
};

export default Header;
