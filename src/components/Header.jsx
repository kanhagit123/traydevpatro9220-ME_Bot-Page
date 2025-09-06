import { Link } from "react-router-dom";

export default function Header() {
  const handleNewChat = () => {
    localStorage.removeItem("history"); // clear history
  };

  return (
    <header className="app-header">
      <h1>Bot AI</h1>
      <nav>
        <Link to="/">Chat</Link>
        <Link to="/history">Past Conversations</Link>
        <Link to="/feedback">Feedback</Link>
        {/* Cypress expects <a> with text "New Chat" */}
        <Link to="/" onClick={handleNewChat}>New Chat</Link>
      </nav>
    </header>
  );
}
