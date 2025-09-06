import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <h1>Bot AI</h1>
      <nav>
        <Link to="/">Chat</Link>
        <Link to="/history">Past Conversations</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/" className="active">New Chat</Link>
      </nav>
    </header>
  );
}
